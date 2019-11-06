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


  showNewFormPromo = false;
  promotion : Promotion[] = [];
  start_date_new_Promotion : Date;
  end_date_new_Promotion : Date;
  promotion_new : Promotion;
  category : Category[] = [];

  yesterday = new Date();

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
    this.adminService.getPromotion().subscribe(data => {
      console.log(data);
      this.promotion = data;
    });
    this.loadCategory();
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
  addNewPro(){
    let daye = this.end_date_new_Promotion.getDate();
    let days = this.start_date_new_Promotion.getDate();

    if(this.start_date_new_Promotion > this.end_date_new_Promotion){
      Swal.fire('Invalid End Date');
    }
    else{
      let day_string = '';
    if(daye < 10){
      day_string = "0" + daye;
    }
    else{
      day_string = daye.toString();
    }
    let end_date = day_string + "/"
                + (this.end_date_new_Promotion.getMonth() + 1) + "/"
                + this.end_date_new_Promotion.getFullYear(); 
    this.promotion_new.end_date = end_date;
    day_string = '';

    if(days < 10){
      day_string = "0" + days;
    }
    else{
      day_string = days.toString();
    }
    let start_date = day_string + "/"
                + (this.start_date_new_Promotion.getMonth() + 1) + "/"
                + this.start_date_new_Promotion.getFullYear(); 
    this.promotion_new.start_date = start_date;

    this.adminService.postPromotion(JSON.stringify(this.promotion_new)).subscribe(data => {
      console.log(data);
    })
    this.promotion_new = new Promotion();
    }
  }
}
