import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { CustomerService } from '../../../services/customer.service'
import { User } from 'src/app/models/user.class';
import { Cart } from 'src/app/models/cart_post.class';
import { Cart_Item } from 'src/app/models/cart_item.class';
import { AuthService } from '../../../services/auth.service'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  cart_items : Cart_Item[] = [];
  count : number = 0;
  totalPrice : number = 0;
  token : any;
  user : User;
  constructor(
    public router : Router,
    private customerService : CustomerService,
    private authService : AuthService
  ) {
  }

  ngOnInit() {
    this.user = new User();
    if(localStorage.getItem("ACCESS_TOKEN")){
      this.token = localStorage.getItem("ACCESS_TOKEN")
      let decode = jwtDecode(this.token ,{ header: true });
      this.loadProfile(decode['user_id']);
      this.loadCart();
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

  loadCart(){
    this.customerService.getCart().subscribe(data => {
      this.cart_items = data['cart_items'];
      console.log(data);
      
      console.log(this.cart_items);
      for (let i = 0; i < this.cart_items.length; i++) {
        let img : string;
        img = this.cart_items[i].product.images.toString().replace(/'/g,'"');
        this.cart_items[i].product.images = JSON.parse(img);
        this.count += this.cart_items[i].quantity;
        this.totalPrice += this.cart_items[i].product.price*this.cart_items[i].quantity;
      }
    }, err => {
      console.log(err);
    })
  }


  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
  }

  public delay(){
    this.sleep().then(data => {
      window.location.reload();
      window.scroll(0,0);
    });
  }

  delCart_Item(id){
    this.customerService.delCart_Item(id).subscribe(data =>{
      console.log(data);
      window.location.reload();
    })
  }
  logout(){
    this.authService.logout();
    window.location.reload();
  }
}
