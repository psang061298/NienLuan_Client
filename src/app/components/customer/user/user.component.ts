import { Component, OnInit, ElementRef, ViewChild, NgZone, OnChanges } from '@angular/core';
import { } from 'googlemaps';
import { MapsAPILoader, GoogleMapsAPIWrapper } from '@agm/core';
import { Marker } from '@agm/core/services/google-maps-types';
import { User } from 'src/app/models/user.class';
import { CustomerService } from '../../../services/customer.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Address } from 'src/app/models/address.class';
import Swal from 'sweetalert2';
import { orderHistory } from 'src/app/models/oderHistory.class';
import { timer } from 'rxjs';
import { AuthService } from '../../../services/auth.service'

declare var $ : any;



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

  @ViewChild('agmSearch' , {static : true}) public addr : ElementRef;


  user : User;
  token : string;
  public place1 : google.maps.places.PlaceResult;
  private formdemo: FormGroup;
  private form_add : FormGroup;
  new_address : Address = new Address();
  showFormAddress = false;
  order_History : orderHistory[] = [];

  oldPass : string;
  newPass : string;
  confirmPass : string;

  constructor(
    private ngZone : NgZone,
    private customerService : CustomerService,
    public router : Router,
    private form: FormBuilder,
    private authService : AuthService
  ) { }

  ngOnInit() {
      this.user = new User();
      this.loadUser();
      this.loadHistory();
      this.newAdressForm();
      this.address();
      this.create();
  }

  loadUser(){
    this.customerService.getUser().subscribe(data => {
        this.user = data;
        console.log(this.user);
        
        this.formdemo.get('name').setValue(this.user.fullname);
        this.formdemo.get('email').setValue(this.user.email);
        this.formdemo.get('gender').setValue(this.user.gender);
    })
  }

  address(){
    let autoaddress = new google.maps.places.Autocomplete(this.addr.nativeElement,{types :["address"]});
    autoaddress.addListener("place_changed",()=>{
      this.ngZone.run(()=>{
        this.place1 = autoaddress.getPlace();
        // console.log(this.place1);
        this.form_add.get('address').setValue(this.place1.formatted_address)
      })
    });
  }

  create() {
    this.formdemo = this.form.group({
      name : ['', [Validators.required]],
      email: [{disabled: true}],
      gender : ['']
    });
  }

  newAdressForm() {
    this.form_add = this.form.group({
      name : ['', [Validators.required]],
      address: ['',Validators.required],
      phone: [
        "",
        [Validators.required, Validators.pattern("^\\+?[0-9]{3}-?[0-9]{6,12}$")]
      ],
    });

  }

  createNewAddForm(){
    this.showFormAddress = true;
  }

  createNewAdress(){
    console.log(this.form_add);
    this.new_address.fullname = this.form_add.get('name').value;
    this.new_address.phone= this.form_add.get('phone').value;
    this.new_address.address= this.form_add.get('address').value;
    console.log(this.new_address);
    let addressJSON = JSON.stringify(this.new_address);
    this.customerService.postAddress(addressJSON).subscribe(data => {
      console.log(data);
      this.showFormAddress = false;

      window.location.reload();
    })
  }

  editImage(event) {
    let selectFile = event.target.files;
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
        this.user.avatar = (res.data.secure_url);
        console.log(this.user);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  onSubmit(){
    this.user.fullname = this.formdemo.get('name').value;
    this.user.gender = this.formdemo.get('gender').value;
    this.customerService.putProfile(JSON.stringify(this.user)).subscribe(data => {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }

  loadHistory(){
    this.customerService.getOldOrder().subscribe(data => {
      console.log(data);
      this.order_History = data['results'];
      this.order_History.forEach(item => {
        if(item.products.length > 0){
          item.products.forEach(item1 => {
              let img = '';
              img = item1['product'].images.toString().replace(/'/g,'"');
              item1['product'].images = JSON.parse(img);
          })
        }
      })
    })
  }

  changeStatus(id){
    Swal.fire({
      title: 'Cancel?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.value) {
        let change = {
          status : "canceled"
        }
        this.customerService.changeStatus(id, JSON.stringify(change)).subscribe(data => {
          console.log(data);
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your order has been canceled!',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadHistory();
        });
      }
    })
  }

  changePass(){
    console.log(this.formdemo);
    
    if(this.newPass != '' && this.newPass == this.confirmPass){
      let user = {
        email : this.formdemo.controls.email.value,
        password : this.oldPass
      }
      console.log(JSON.stringify(user));
      
      this.authService.checkPass(JSON.stringify(user)).subscribe(data => {
        if(data == true){
          let password = {
            password : this.newPass
          }
          this.customerService.changePass(JSON.stringify(password)).subscribe(data => {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          })
        }
      },err => {
        Swal.fire('Wrong password')
      })
    }
    else{
      Swal.fire('Confirm password not match')
    }
    
  }
}
