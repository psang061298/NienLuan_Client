import { Component, OnInit, OnChanges } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { Promotion } from 'src/app/models/promotion.class';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Moment } from 'moment';
import { JsonPipe, DatePipe } from '@angular/common';
import { Category } from 'src/app/models/category.class';

import { DatepickerOptions } from 'ng2-datepicker';
import * as frLocale from 'date-fns/locale/en';
import Swal from 'sweetalert2';

declare var $ : any;

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {


  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2030,
    displayFormat: 'DD-MM-YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 1, // 0 - Sunday, 1 - Monday
    locale: frLocale,
    addClass: 'form-control', // Optional, value to pass on to [ngClass] on the input field
    fieldId: 'my-date-picker', // ID to assign to the input field. Defaults to datepicker-<counter>
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', // HTML input placeholder attribute (default: '')
    useEmptyBarTitle: false, // Defaults to true. If set to false then barTitleIfEmpty will be disregarded and a date will always be shown 
  };
  selectFile: File = null;
  editID = 0;

  showNewFormPromo = false;
  promotion : Promotion[] = [];
  start_date_new_Promotion : Date;
  end_date_new_Promotion : Date;
  promotion_new : Promotion;
  promotion_edit : Promotion;
  category : Category[] = [];
  yesterday = new Date();

  start_date_temp : Date;
  end_date_temp : Date;

  constructor(
    private form: FormBuilder,
    private adminService : AdminService,
  ) { }

  ngOnInit() {
    this.yesterday.setDate(this.yesterday.getDate() - 1);
    console.log(this.yesterday);
    this.options.minDate = this.yesterday;
    this.start_date_new_Promotion = new Date(Date.now());
    this.end_date_new_Promotion= new Date(Date.now());
    this.promotion_new = new Promotion();
    this.promotion_edit = new Promotion();

    this.loadPromotion();
    this.loadCategory();
  }

  loadPromotion(){
    this.adminService.getPromotion().subscribe(data => {
      console.log(data);
      this.promotion = data;
    });
  }

  loadCategory(){
    this.adminService.getcategory().subscribe(data => {
      this.category = data;
      this.promotion_new.category = this.category[0].id;
    })
  }

  showFormAddPro(){
    this.showNewFormPromo = true;
  }

  changeCate(event){
    console.log(event);
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
      allowOutsideClick: true,
      allowEscapeKey: true,
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
          this.promotion_new.image = res.data.secure_url;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  editImage(event) {
    this.selectFile = event.target.files;
    const url = "http://127.0.0.1:8000/upload_image/";
    const myData = new FormData();
    myData.append('source', this.selectFile[0]);
    Swal.fire({
      position: 'top-end',
      title: 'Please Wait..!',
      text: 'Is working..',
      allowOutsideClick: true,
      allowEscapeKey: true,
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
          this.promotion_edit.image = res.data.secure_url;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  addNewPro(){
    if(this.promotion_new.image == ''){
      Swal.fire('Image is requied')
    }
    else{
      if(this.start_date_new_Promotion > this.end_date_new_Promotion){
          Swal.fire('Invalid End Date');
      }
      else{
        this.promotion_new.end_date = this.encodeDate(this.end_date_new_Promotion);
        this.promotion_new.start_date = this.encodeDate(this.start_date_new_Promotion);
        this.adminService.postPromotion(JSON.stringify(this.promotion_new)).subscribe(data => {
          this.showNewFormPromo = false;
          this.loadPromotion();
        })
        this.promotion_new = new Promotion();
      }
    }
  }

  encodeDate(date : Date) : string {
    let result = '';
    let day = date.getDate();
    let day_string = '';
    if(day < 10){
      day_string = "0" + day;
    }
    else{
      day_string = day.toString();
    }
    result = day_string + "-"
                + (this.end_date_new_Promotion.getMonth() + 1) + "-"
                + this.end_date_new_Promotion.getFullYear(); 
    return result;
  }

  decodeDate(str) : Date{
      let day = str.substr(0,2);
      let month = str.substr(3,2);
      let year = str.substr(6);
      let date =  year+ "-" + month + "-" +  day +"T00:00:00";
    return new Date(date);
  }

  activeEdit(id){
    this.adminService.getOnePromotion(id).subscribe(data => {
      this.promotion_edit = data;
      this.promotion_edit.category = data['category']['id'];
      this.start_date_temp = this.decodeDate(this.promotion_edit.start_date);
      this.end_date_temp   = this.decodeDate(this.promotion_edit.end_date);
      console.log(this.promotion_edit);
      
    })
    this.editID = id;
  }
  edit(id){
    this.promotion_edit.start_date = this.encodeDate(this.start_date_temp);
    this.promotion_edit.end_date = this.encodeDate(this.end_date_temp);
    this.adminService.putPromotion(id,this.promotion_edit).subscribe(data => {
      this.loadPromotion();
      this.promotion_edit = new Promotion();
    })
    this.editID = 0;
  }

  delPromotion(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value) {
        this.adminService.delPromotion(id).subscribe(data => {
          this.loadPromotion();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        })
      }
    })
  }
}
