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
    this.activatedRoute.params.subscribe(data => {
      this.id = data['id'],
      console.log(this.id);
      
      this.loadSpec(this.product['spec']);
    });
    this.loadCate();
    this.loadBrand();
  }

  loadCate(){
    this.adminService.getcategory().subscribe(data => {
      this.category = data;
      console.log(data);
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
      console.log(data);
      
      this.product.brand = data[0].id
    })
  }


  create() {
    this.formdemo = this.form.group({
      name: ['', [Validators.required , Validators.minLength(2)]],
      des : [''],
      price: ['', [Validators.required, Validators.pattern('^[1-9]{1}[0-9]*')]],
      quantity: ['', [Validators.required]]
    });
  }

  something = '';

  AddSpec() {

    var newSpec : Object = {
      key : '',
      value : ''
    }
    this.specArray.push(newSpec);
    // if (this.newSpec['key'] != '' && this.newSpec['value'] != '') {
    //   this.spec.push(this.newSpec);
    //   this.newSpec = {};
    // } else {
    //   Swal.fire({
    //     type: 'error',
    //     title: 'Oops...',
    //     text: 'Something went wrong!' + ' specification is requied'
    //   });
    // }
    
  }

  delSpec(index) {
    if (this.specArray.length === 1) {
      this.specArray.pop();
    } else {
      this.specArray.splice(index, 1);
    }
    console.log(this.specArray);
  }

  // changekey(i, value) {
  //   this.spec[i].key = value;
  // }

  // changevalue(i, value) {
  //   this.spec[i].value = value;
  // }

  
  change(e){
    console.log(e);
    
  }

  public onReady(editor) {
    //console.log(editor);

    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  submit(proForm){
    console.log(proForm);
    console.log(proForm.form.controls.detail.value);
    
  }


  ngOnDestroy(): void {
    this.Editor = '';
    this.config = { extraPlugins: [] };
  }


  Preview(event) {
    this.selectFile = event.target.files;
    const url = "http://127.0.0.1:8000/api/upload_image/";
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
      success: data => {
        console.log(data);
        
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
