import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import jwtDecode from 'jwt-decode'
import { CustomerService } from '../../../services/customer.service'
import { User } from 'src/app/models/user.class';
import { Cart } from 'src/app/models/cart.class';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit , OnChanges {

  cart : Cart;
  token : any;
  user : User;
  constructor(
    public router : Router,
    private customerService : CustomerService,
  ) {
  }

  ngOnInit() {
    this.user = new User();
    this.token = localStorage.getItem('ACCESS_TOKEN');
    if(this.token){
      let decode = jwtDecode(this.token);
      this.loadProfile(decode['user_id']);
    }
  }

  loadProfile(id){
    this.customerService.getProfile().subscribe(data => {
      this.user = data[0];
      console.log(this.user);
      this.customerService.user_id = this.user['id'];
      this.customerService.sendUser(this.user);
    })
  }

  ngOnChanges(): void {
    this.token = localStorage.getItem('ACCESS_TOKEN');
    if(this.token){
      let decode = jwtDecode(this.token);
      this.loadProfile(decode['user_id']);
    }
  }


  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
  }

  public delay(){
    this.sleep().then(data => {
      window.location.reload();
    });
  }

}
