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
  constructor(
    private ngZone : NgZone,
    private customerService : CustomerService,
    public router : Router,
    private form: FormBuilder,

  ) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.customerService.getUser().subscribe(data => {
      if(data){
        this.user = data;
        console.log(this.user);
        
        this.create();
        this.newAdressForm();
        this.address();

      }
      else{
        this.router.navigateByUrl('');
      }
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
      name : [this.user.fullname, [Validators.required]],
      email: [this.user.email],
      gender : [this.user.gender]
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
    this.new_address.member = this.customerService.user_id;
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
    this.customerService.putProfile(this.user['id'],JSON.stringify(this.user)).subscribe(data => {
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    })
  }
}
