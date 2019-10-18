import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploaderPlugin from '@ckeditor/Base64Image.js';
import { AdminService } from '../../../services/admin/admin.service'
import { Category } from 'src/app/models/category.class';
import { Brand } from 'src/app/models/brand.class';
import { Product } from 'src/app/models/product.class';
// import * as $ from '@types/jquery';


declare var $: any

@Component({
  selector: 'app-product-detail-admin',
  templateUrl: './product-detail-admin.component.html',
  styleUrls: ['./product-detail-admin.component.scss']
})


export class ProductDetailAdminComponent implements OnInit , OnDestroy{

  public Editor = ClassicEditor;
  config = { extraPlugins: [Base64UploaderPlugin] }
  public product : Product;

  public specArray : any[] = [];
  public category : Category[] = [];
  public brands : Brand[] = [];
  selectedCate : number;

  id : number;
  private formdemo: FormGroup;
  submitted = false;

  selectFile: File = null;
  public imgServer = new Object({
    images: []
  });

  constructor(
    private form: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private adminService : AdminService,
  ) { }

  ngOnInit() {
    this.brands = new Array();
    this.product = new Product();
    this.activatedRoute.params.subscribe(data => {
      this.id = data['id'],
      console.log(this.id);
      this.loadSpec(this.product['spec']);
    });
    this.loadCate();
    this.loadBrand();
    this.create();
  }

  loadCate(){
    this.adminService.getcategory().subscribe(data => {
      this.category = data;
      this.selectedCate = this.category[0].id;
      this.product.category = this.category[0].id;
    })
  }
  
  loadSpec(any) {
    this.specArray = Object.keys(any).map(it => ({ key: it, value: any[it] }));
    console.log(this.specArray);
  }

  loadBrand(){
    this.adminService.getBrand().subscribe(data => {
      this.brands = data;
      this.product.brand = data[0].id
    })
  }


  create() {
    this.formdemo = this.form.group({
      name: ['', [Validators.required , Validators.minLength(2)]],
      des : [''],
      price: [0, [Validators.required, Validators.pattern('^[1-9]{1}[0-9]*')]],
      quantity: [0, [Validators.required , , Validators.pattern('^[1-9]{1}[0-9]*')]],
      is_active : [false],
    });
  }

  something = '';

  AddSpec() {

    var newSpec : Object = {
      key : '',
      value : ''
    }
    this.specArray.push(newSpec);
  }

  delSpec(index) {
    if (this.specArray.length === 1) {
      this.specArray.pop();
    } else {
      this.specArray.splice(index, 1);
    }
    console.log(this.specArray);
  }

  delImage(index){
    if (this.imgServer['images'].length == 1) {
      this.imgServer['images'].pop();
    } else {
      this.imgServer['images'].splice(index, 1);
    }
  }

  changekey(i, value) {
    this.specArray[i].key = value;
  }

  changevalue(i, value) {
    this.specArray[i].value = value;
  }

  
  changeBrand(event){
    this.product.brand = event.id;
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  submit(){
    // let imgJSON = JSON.stringify(this.imgServer['images']);
    // console.log(imgJSON);
    this.product.is_active = this.formdemo.get('is_active').value;

    if (this.specArray.length > 0) {
      const object = this.specArray.reduce(
        (acc, it) => ((acc[it.key] = it.value), acc),
        {}
      );
      this.product.specifications = object;
    }

    if(this.imgServer['images'].length > 0){
      this.product.images = this.imgServer['images'];
    }

    let productJSON = JSON.stringify(this.product);
    this.adminService.postProduct(productJSON).subscribe(data => {
      console.log(data);
    })
  }


  ngOnDestroy(): void {
    this.Editor = '';
    this.config = { extraPlugins: [] };
  }


  Preview(event) {
    this.selectFile = event.target.files;
    const url = "http://127.0.0.1:8000/upload_image/";
    const myData = new FormData();
    myData.append('source', this.selectFile[0]);

    $.ajax({
      url,
      data: myData,
      headers: {
        // Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
      },
      processData: false,
      contentType: false,
      type: 'POST',
      success: res => {
        // console.log(res.data.secure_url);
        this.imgServer['images'].push(res.data.secure_url);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  changeCate(value){
    this.product['category'] = value;
    console.log(this.product['category']);
  }
}
