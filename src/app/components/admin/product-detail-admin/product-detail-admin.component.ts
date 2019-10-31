import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Base64UploaderPlugin from '@ckeditor/Base64Image.js';
import { AdminService } from '../../../services/admin/admin.service'
import { Category } from 'src/app/models/category.class';
import { Brand } from 'src/app/models/brand.class';
import { Product } from 'src/app/models/product.class';
import Swal from 'sweetalert2';
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
    this.category = new Array();
    this.product = new Product();
    this.activatedRoute.params.subscribe(data => {
      this.id = data['id'];
        this.create();
        this.loadCate();
        this.loadBrand();
      if(this.id != 0){
        this.adminService.getProductDetail(this.id).subscribe(data => {
          console.log(data);
          this.product = data;
          this.loadData();
        })
      }
      else{
        this.rawData()
      }
      // this.loadSpec(this.product['spec']);
    });

  }

  loadData(){
    this.formdemo.get('name').setValue(this.product.name);
    this.formdemo.get('category').setValue(this.product.category['title']);
    this.formdemo.get('brand').setValue(this.product.brand);
    this.formdemo.get('is_active').setValue(this.product.is_active);
    this.formdemo.get('price').setValue(this.product.price);
    this.formdemo.get('quantity').setValue(this.product.quantity);
    this.formdemo.get('des').setValue(this.product.description);
    this.loadSpec(this.product.specifications);
    this.product.images.forEach(data => {
      this.imgServer['images'].push(data);
    })
    this.product.brand = this.product.brand['id'];
    this.product.category = this.product.category['id'];
  }

  rawData(){
    // this.product.category = this.category[0].id;
    // this.formdemo.get('category').setValue(this.category[0].title);
  }


  loadCate(){
    this.adminService.getcategory().subscribe(data => {
      this.category = data;
      // this.selectedCate = this.category[0].id;
      if(this.id == 0){
      this.product.category = this.category[0].id; // luu trong csdl      
      this.formdemo.get('category').setValue(this.category[0].title); //de cho nguoi ta coi thoi
      }
    })
  }
  
  loadSpec(any) {
    this.specArray = Object.keys(any).map(it => ({ key: it, value: any[it] }));
    console.log(this.specArray);
  }

  loadBrand(){
    this.adminService.getBrand().subscribe(data => {
      this.brands = data;
      if(this.id == 0){
      this.product.brand = this.brands[0].id; // luu trong csdl
        this.formdemo.get('brand').setValue(this.brands[0]);
      }
    })
  }


  create() {
    this.formdemo = this.form.group({
      name: ['', [Validators.required , Validators.minLength(2)]],
      des : [''],
      price: [0, [Validators.required, Validators.pattern('^[1-9]{1}[0-9]*')]],
      quantity: [0, [Validators.required , , Validators.pattern('^[1-9]{1}[0-9]*')]],
      is_active : [false],
      category : [''],
      brand : [''],
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

  changeCate(event){
    console.log(event);
    
    this.product.category = event
  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  submit(){

    this.product.is_active = this.formdemo.get('is_active').value;
    this.product.name = this.formdemo.get('name').value;
    this.product.description = this.formdemo.get('des').value;
    this.product.price = this.formdemo.get('price').value;
    this.product.quantity = this.formdemo.get('quantity').value;
    
    if (this.specArray.length > 0) {
      const object = this.specArray.reduce(
        (acc, it) => ((acc[it.key] = it.value), acc),
        {}
      );
      this.product.specifications = object;
    }

    if(this.imgServer['images'].length > 0){
      this.product.images = this.imgServer['images'];

      console.log(this.product);
    
      let productJSON = JSON.stringify(this.product);
      console.log(productJSON);
      
      if(this.id == 0){
        this.adminService.postProduct(productJSON).subscribe(data => {
          console.log(data);
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/admin/product');
        })
      }
      else{
        this.adminService.putProduct(this.id,productJSON).subscribe(data => {
          console.log(data);
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.router.navigateByUrl('/admin/product');
        })
      }
      
    }
    else{
      Swal.fire('Image is requied');
    }

    
  }


  ngOnDestroy(): void {
    this.Editor = '';
    this.config = { extraPlugins: []};
  }


  Preview(event) {
   
    this.selectFile = event.target.files;
    const url = "http://127.0.0.1:8000/upload_image/";
    const myData = new FormData();
    myData.append('source', this.selectFile[0]);
    Swal.fire({
      position: 'top-end',
      title: 'Please Wait..!',
      text: 'Is working..',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      onOpen: () => {
          Swal.showLoading()
      }
  })
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
        Swal.hideLoading();
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Image is Uploaded',
          showConfirmButton: false,
          timer: 1500
        })
        this.imgServer['images'].push(res.data.secure_url);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  delProduct(id){

  }

}
