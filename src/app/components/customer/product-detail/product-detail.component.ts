import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';
import { Product } from 'src/app/models/product.class';
import { Brand } from 'src/app/models/brand.class';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  id : number;
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
      this.id = data['id'],
      this.customerService.getOneProduct(this.id).subscribe(data => {
        this.product = data;
        console.log(this.product);
        
      })
    });
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


  

}
