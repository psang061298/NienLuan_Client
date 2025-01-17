import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';
import { Promotion } from 'src/app/models/promotion.class';
import { Product } from 'src/app/models/product.class';
import { Brand } from 'src/app/models/brand.class';
import { EventEmitter } from 'events';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Options } from 'ng5-slider';
import { Cart_Item } from 'src/app/models/cart_item.class';
import Swal from 'sweetalert2';


declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public promotion : Promotion[] = [];
  discount = 0;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: '<--',
      nextLabel: '-->',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`
  };

  minValue: number = 0;
  maxValue: number = 50;
  options_slider: Options = {
    floor: 0,
    ceil: 50
  };

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['',''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

  OptionForProduct: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['',''],
    responsive: {
      0: {
        items: 4
      },
    },
    nav: true
  }


  NewestProduct : Product[] = [];
  catefilter : number = -1;
  brandfilter : number = -1;
  product : Product[] = [];
  brand : Brand[] = [];
  collection = { count: 9, data: [] };
  config = {
    id: 'custom',
    itemsPerPage: 9,
    currentPage: 1,
    totalItems : 100,
  };

  cart_items : Cart_Item[] = [];

  priceOfNewProduct : number[] = [];

  constructor(
    private customerService : CustomerService,
  ) {        

  }
  
  categories : Category[] = [];
ngOnInit() {
  this.priceOfNewProduct = new Array();
  this.loadPromotion();
  this.loadCate();
    
    this.loadBrand();
}

loadPromotion(){
  this.customerService.getPromotion().subscribe(data => {
    this.promotion = data;
    console.log(data);
    this.loadNewProduct();
  })
}

  loadCate(){
    this.customerService.getCategory().subscribe(data =>{
      this.categories = data;
      this.changeCate(this.categories[0].id);
    })
  }

  loadNewProduct(){
    this.customerService.getNewProduct(7).subscribe(data=>{
      this.NewestProduct = data['results'];
      console.log(this.NewestProduct);
      this.NewestProduct.forEach(item => {
        let new_Price = 0;
        for (let i = 0; i < this.promotion.length; i++) {
          if(item.category['id'] == this.promotion[i].category['id']){
            new_Price = item.price * (100 - this.promotion[i].percent) / 100;
            this.priceOfNewProduct.push(new_Price);
            break;
          }
        }
        if(new_Price == 0){
          this.priceOfNewProduct.push(0);
        }
      });
    })
    console.log(this.priceOfNewProduct);
    
  }

  loadBrand(){
    this.customerService.getBrand().subscribe(data => {
      this.brand = data;
    })
  }

  loadProductFilter(page){
    page = this.config.currentPage;
    if(this.catefilter != -1 && this.brandfilter == -1){
      this.customerService.getProductCateFilter(this.catefilter,page,this.minValue*1000000,this.maxValue*1000000).subscribe(data => {
        console.log(data);
        
        this.collection.data = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];
      })
    }
    else if(this.catefilter == -1 && this.brandfilter != -1){
          this.customerService.getProductBrandFilter(this.brandfilter,page,this.minValue*1000000,this.maxValue*1000000).subscribe(data => {
            console.log(data);
            this.collection.data = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];
            
          })
        }
        else {
          this.customerService.getProductBothFilter(this.catefilter,this.brandfilter,page,this.minValue*1000000,this.maxValue*1000000).subscribe(data => {
            console.log(data);
            this.collection.data = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];

          })
        }
  }
  changeCate(value){
    let hasDiscount = false;
    this.catefilter = value;
    console.log(value);
    this.config.currentPage = 1;
    this.brandfilter = -1;
    for (let i = 0; i < this.promotion.length; i++) {
      if(value == this.promotion[i].category['id']){
        this.discount = this.promotion[i].percent;
        hasDiscount = true;
        break;
      }
    }
    if(!hasDiscount){
      this.discount = 0;
    }
    this.loadProductFilter(this.config.currentPage);
  }

  changeBrand(value){
    this.brandfilter = value;
    this.config.currentPage = 1;
    this.loadProductFilter(this.config.currentPage);
  }

  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 20)).then(()=>console.log("fired"));
}

  public reload(){
    this.sleep().then(data => {
      window.scroll(0,0);
      window.location.reload();
    });
  }

  onPageChange(event){
    console.log(event);
    this.config.currentPage = event;
    this.loadProductFilter(this.config.currentPage);
    window.scroll(0,1050);
  }

  loadCart(){
    this.customerService.getCart().subscribe(data => {
      this.cart_items = data;
      console.log(this.cart_items);
    }, err => {
      console.log(err);
    })
  }

  addCart(id){
    let already = false;
    if(localStorage.getItem('ACCESS_TOKEN')){
      this.cart_items.forEach(item => {
        if(id == item.product.id){
          let Cart : Object = {
            quantity : 1 + item.quantity,
            product : Number.parseInt(id.toString()),
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
          quantity : 1,
          product : Number.parseInt(id.toString()),
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
