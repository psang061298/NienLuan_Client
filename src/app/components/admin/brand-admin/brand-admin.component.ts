import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand.class';
import { AdminService } from '../../../services/admin/admin.service';
declare var $: any

@Component({
  selector: 'app-brand-admin',
  templateUrl: './brand-admin.component.html',
  styleUrls: ['./brand-admin.component.scss']
})
export class BrandAdminComponent implements OnInit {

  selectFile: File = null;
  public imgServer = new Object({
    image: ''
  });
  submited = false;

  constructor(
    private adminService : AdminService
  ) { }
  brand : Brand[] = [];
  brand_new : Brand;
  brand_now : Brand;

  ngOnInit() {
    this.brand = new Array();
    this.brand_new = new Brand();
    this.brand_now = new Brand();
    this.loadBrand();
  }

  loadBrand(){
    this.adminService.getBrand().subscribe(data => {
      this.brand = data;
      console.log(this.brand);
    })
  }

  open(id){
    this.adminService.getOneBrand(id).subscribe(data => {
      this.brand_now = data;
      console.log(this.brand_now);
    })
  }

  createBrand(){
    this.brand_new.logo = this.imgServer['image'];
    let brand_newJSON = JSON.stringify(this.brand_new);
    // console.log(brand_newJSON);
    console.log(this.brand_new);
    
    this.adminService.postBrand(brand_newJSON).subscribe(data => {
      console.log(data);
      this.loadBrand();
      this.brand_new = new Brand();
    })
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
        console.log(res.data.secure_url);
        this.brand_now.logo = (res.data.secure_url);
        console.log(this.brand_now);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  editBrand(frm){
    this.submited = true;
    if(frm.valid){
      let brandJSON = JSON.stringify(this.brand_now);
      console.log(brandJSON);
      
      this.adminService.putBrand(this.brand_now.id,brandJSON).subscribe(data =>{
        console.log(data);
        this.loadBrand();
      })
    }
    else{
      console.log(frm)
    }
  }
}
