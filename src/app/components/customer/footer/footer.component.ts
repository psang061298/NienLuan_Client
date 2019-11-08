import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.class';
import { CustomerService } from '../../../services/customer.service';
import jwtDecode from 'jwt-decode'
import { UrlResolver } from '@angular/compiler';
import { MapsAPILoader } from '@agm/core';
import { Address } from 'src/app/models/address.class';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @ViewChild("address", { static: false }) add: ElementRef;
  placeresult : string;
  public place: google.maps.places.PlaceResult;
  agree = false;

  new_address_name : string;
  new_address_phone : string;
  

  constructor(
    private auth: AuthService,
    private router: Router,
    private customerService : CustomerService,
    private ngZone: NgZone,
    private map: MapsAPILoader
  ) { }

  ngOnInit() {
    this.ad();
  }

  ad() {
    this.map.load().then(() => {
      const autoaddress = new google.maps.places.Autocomplete(
        this.add.nativeElement,
        { types: ["address"] }
      );
      autoaddress.addListener("place_changed", () => {
        this.ngZone.run(() => {
          this.place = autoaddress.getPlace();
          this.placeresult = this.place["formatted_address"];
          console.log(this.place.address_components);
        });
      });
    });
  }

  onSubmit(form){
    console.log(form);
    this.auth.login(form.value).subscribe(
      data => {
        let decode = jwtDecode(data.access);
            this.customerService.user_id = decode['user_id'];
            console.log(this.customerService.user_id);
            
            if(decode['user_id'] == 1){
              this.router.navigateByUrl('/admin');
            }
            else{
              this.router.navigateByUrl('/index/home');
              window.location.reload();
            }
      },
      error => {
        // console.log(error.error.detail);
        Swal.fire(error.error.detail);
      }
    );
  }

  onRegister(form){
    let user = new User();
    console.log(form);
    user.fullname = form.controls.fullname.value;
    user.email = form.controls.email.value;
    user.password = form.controls.password.value;
    let userJSON = JSON.stringify(user);
    this.customerService.register(userJSON).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  }

  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
  }

  public delay(){
    this.sleep().then(data => {
      window.location.reload();
    });
  }

  addAdress(){
    console.log(this.new_address_name);
    console.log(this.placeresult);
    console.log(this.new_address_phone);

    let address = new Address();
    address.fullname = this.new_address_name;
    address.address = this.placeresult;
    address.phone = this.new_address_phone;

    this.customerService.postAddress(JSON.stringify(address)).subscribe(data => {
      console.log(data);
      window.location.reload();
    })
  }
}
