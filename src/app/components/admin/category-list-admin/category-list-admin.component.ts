import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.class';
import { AdminService } from '../../../services/admin/admin.service';
import Swal from 'sweetalert2';

declare var $: any


@Component({
  selector: 'app-category-list-admin',
  templateUrl: './category-list-admin.component.html',
  styleUrls: ['./category-list-admin.component.scss']
})
export class CategoryListAdminComponent implements OnInit {

  selectFile: File = null;
  public imgServer = new Object({
    image: ''
  });

  constructor(
    private adminService : AdminService
  ) { }

  public categories : Category[] = [];

  public category_now : Category;

  public category_new : Category;

  ngOnInit() {
    this.category_new = new Category();
    this.category_now = new Category();
    this.loadCategory();
    
  }

  public loadCategory(){
    this.adminService.getcategory().subscribe(data => {
      this.categories = data;
    })
  }

  public open(id){
     this.adminService.getOneCategory(id).subscribe(data => {
       this.category_now = data;
       console.log(this.category_now);
       
     })
  }

  public close(){
    this.category_now = new Category();
  }

  submited : boolean = false;

  editCategory(reciveform){
    this.submited = true;
    if(reciveform.valid){
      var cateJson = JSON.stringify(this.category_now);
      console.log(cateJson);
      
      this.adminService.putcategory(this.category_now.id,this.category_now).subscribe(data =>{
        console.log(data);
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.loadCategory();

      })
    }
    else{
      console.log(reciveform)
    }
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
        Swal.hideLoading();
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Image is Uploaded',
          showConfirmButton: false,
          timer: 1500
        })
        this.imgServer['image'] = (res.data.secure_url);
        console.log(this.imgServer);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  editImage(event) {
    let selectFile = event.target.files;
    console.log('chay');
    
    const url = "http://127.0.0.1:8000/upload_image/";
    const myData = new FormData();
    myData.append('source', selectFile[0]);
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
        Swal.hideLoading();
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Image is Uploaded',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(res.data.secure_url);
        this.category_now.image = (res.data.secure_url);
        console.log(this.category_now);
      },
      error: error => {
        console.log(error);
      }
    });
  }



  createCategory(frm){
    this.category_new.image = this.imgServer['image'];
    let category_newJSON = JSON.stringify(this.category_new);
    console.log(category_newJSON);
    this.adminService.postCategory(category_newJSON).subscribe(data => {
      console.log(data);
      console.log(localStorage.getItem('ACCESS_TOKEN'));
      
      this.loadCategory();
      this.category_new = new Category();
      this.imgServer['image']='';
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    })
    // console.log(this.category_new);
  }

  delCate(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.adminService.delCategory(this.category_now.id).subscribe(data => {
          this.loadCategory();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }

  delImage(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.imgServer['image']='';
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
      }
    })
  }
}
