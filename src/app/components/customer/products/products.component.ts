import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';
import { Product } from 'src/app/models/product.class';
import { Brand } from 'src/app/models/brand.class';
import { EventEmitter } from 'events';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor(
    private customerService : CustomerService,
  ) { }
  categories : Category[] = [];
  NewestProduct : Product[] = [];
  catefilter : number = -1;
  brandfilter : number = -1;
  product : Product[] = [];
  brand : Brand[] = [];
  p : number = 1; 

  
  config = {
    id: 'custom',
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
  };

  ngOnInit() {
    this.loadCate();
    this.loadNewProduct();
    this.loadBrand();
  }

  loadCate(){
    this.customerService.getCategory().subscribe(data =>{
      this.categories = data;
    })
  }

  loadNewProduct(){
    this.customerService.getNewProduct(7).subscribe(data=>{
      this.NewestProduct = data['results'];
      // console.log(this.NewestProduct);
    })
  }

  loadBrand(){
    this.customerService.getBrand().subscribe(data => {
      this.brand = data;
    })
  }

  loadProductFilter(){
    if(this.catefilter != -1 && this.brandfilter == -1){
      this.customerService.getProductCateFilter(this.catefilter).subscribe(data => {
        this.product = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];
      })
    }
    else if(this.catefilter == -1 && this.brandfilter != -1){
          this.customerService.getProductBrandFilter(this.brandfilter).subscribe(data => {
            this.product = data['results'];
            console.log(data['results']);
        this.config.totalItems = data['count'];
            
          })
        }
        else{
          this.customerService.getProductBothFilter(this.catefilter,this.brandfilter).subscribe(data => {
            this.product = data['results'];
            console.log(data['results']);
        this.config.totalItems = data['count'];

          })
        }
  }
  changeCate(value){
    this.catefilter = value;
    console.log(value);
    this.loadProductFilter();
  }

  changeBrand(value){
    this.brandfilter = value;
    this.loadProductFilter();
  }
  }