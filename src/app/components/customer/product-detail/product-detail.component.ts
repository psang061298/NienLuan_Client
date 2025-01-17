import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';
import { Product } from 'src/app/models/product.class';
import { Brand } from 'src/app/models/brand.class';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { Cart_Item } from 'src/app/models/cart_item.class';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  cart_items : Cart_Item[] = [];
  oldPrice = 0;

  id : number;
  public specArray : any[] = [];
  product : Product;
  amount : number = 1;
  constructor(
    private customerService : CustomerService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.product = new Product();
    this.activatedRoute.params.subscribe(data => {
      this.id = data['id'];
      this.loadOneProduct();
      // this.loadPromotion();
    });
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.loadCart();
    }
  }

  loadOneProduct(){
    this.customerService.getOneProduct(this.id).subscribe(data => {
      this.product = data;
      console.log(this.product);
      this.loadPromotion();
      this.loadSpec(this.product.specifications);
    })
  
  }

  loadCart(){
    this.customerService.getCart().subscribe(data => {
      this.cart_items = data;
      console.log(this.cart_items);
    }, err => {
      console.log(err);
    })
  }

  loadPromotion(){
    this.customerService.getPromotion().subscribe(data => {
      data.forEach(promo => {
        if(promo.category['id'] == this.product.category['id']){
          this.oldPrice = this.product.price;
          this.product.price = this.product.price * (100-promo.percent) /100;
        }
      });
    })
  }

  loadSpec(any) {
    this.specArray = Object.keys(any).map(it => ({ key: it, value: any[it] }));
    console.log(this.specArray);
  }

  checkQty(value) {
    console.log(this.amount);
    
    if (value == 0 || value == null) {
      Swal.fire('Số lượng đặt mua phải lớn hơn 0');
      this.amount = 1;
    }
    else{
      if(value > this.product.quantity){
      Swal.fire(`Số lượng sản phẩm chỉ còn ${this.product.quantity}`)
      this.amount = this.product.quantity;
      }
    }
  }
  changeQty(value){
    if(this.amount > 0 && this.amount < this.product.quantity){
      this.amount = this.amount + value;
      if(this.amount == 0){
        this.amount = 1;
      }
    }
  }

  addCart(){
    let already = false;
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.cart_items.forEach(item => {
        if(this.id == item.product.id){
          let Cart : Object = {
            quantity : this.amount + item.quantity,
            product : Number.parseInt(this.id.toString()),
            cart : this.customerService.user_id
          }
          let cartJSON = JSON.stringify(Cart);
          console.log(cartJSON);
          
          this.customerService.putCart(item['id'],cartJSON).subscribe(data => {
            console.log(data);
          })
          already = true;
        }
      });
  
      if(!already){
        let Cart : Object = {
          quantity : this.amount,
          product : Number.parseInt(this.id.toString()),
          cart : this.customerService.user_id
        }
        let cartJSON = JSON.stringify(Cart);
        this.customerService.postCart(cartJSON).subscribe(data => {
          console.log(data);
        })
        console.log(cartJSON);
      }
      window.location.reload();
    }
    else{
      Swal.fire({
        title: 'Login first',
        type: 'info',
      })
    }
  }
}
