import { Component, OnInit } from '@angular/core';
import { Cart_Item } from 'src/app/models/cart_item.class';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart_items : Cart_Item[] = [];
  totalPrice = 0;
  constructor(
    private customerService : CustomerService,
  ) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart(){
    this.customerService.getCart().subscribe(data => {
      this.cart_items = data[0]['cart_items'];
      console.log(this.cart_items);
      for (let i = 0; i < this.cart_items.length; i++) {
        let img : string;
        img = this.cart_items[i].product.images.toString().replace(/'/g,'"');
        this.cart_items[i].product.images = JSON.parse(img);
        this.totalPrice += this.cart_items[i].product.price*this.cart_items[i].quantity;
      }
    }, err => {
      console.log(err);
    })
  }

  checkQty(i,value) {
    if (value == 0 || value == null) {
      Swal.fire('Số lượng đặt mua phải lớn hơn 0');
      this.cart_items[i].quantity = 1;
    }
    else{
      if(value > this.cart_items[i].product.quantity){
      Swal.fire(`Số lượng sản phẩm chỉ còn ${this.cart_items[i].product.quantity}`)
      this.cart_items[i].quantity = this.cart_items[i].product.quantity;
      }
    }
    let cart_editJSON = JSON.stringify({
      quantity : this.cart_items[i].quantity
    })
    console.log(cart_editJSON);
    this.customerService.putCart_Item(this.cart_items[i]['id'],cart_editJSON).subscribe(data => {
      window.location.reload();
    })
  }

  changeQty(i , value){
    this.cart_items[i].quantity += value;

    if(this.cart_items[i].quantity > 0 && this.cart_items[i].quantity < this.cart_items[i].product.quantity){
      let cart_editJSON = JSON.stringify({
        quantity : this.cart_items[i].quantity
      });
      this.customerService.putCart_Item(this.cart_items[i]['id'],cart_editJSON).subscribe(data => {
        window.location.reload();
      })
    }
    else{
      this.cart_items[i].quantity = 1;
    }
  }
}


