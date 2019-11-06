import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';
import { Promotion } from 'src/app/models/promotion.class';
import { Product } from 'src/app/models/product.class';
import { Brand } from 'src/app/models/brand.class';
import { EventEmitter } from 'events';


declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public promotion : Promotion[] = [];
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
  constructor(
    private customerService : CustomerService,
  ) {        

  }
  
  categories : Category[] = [];
ngOnInit() {
  this.customerService.getCategory().subscribe(data =>{
    this.categories = data;
  })
  this.loadPromotion();
  this.loadCate();
    this.loadNewProduct();
    this.loadBrand();
}

loadPromotion(){
  this.customerService.getPromotion().subscribe(data => {
    this.promotion = data;
    console.log(data);
    
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
      // console.log(this.NewestProduct);
    })
  }

  loadBrand(){
    this.customerService.getBrand().subscribe(data => {
      this.brand = data;
    })
  }

  loadProductFilter(page){
    if(this.catefilter != -1 && this.brandfilter == -1){
      this.customerService.getProductCateFilter(this.catefilter,page).subscribe(data => {
        console.log(data);
        
        this.collection.data = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];
      })
    }
    else if(this.catefilter == -1 && this.brandfilter != -1){
          this.customerService.getProductBrandFilter(this.brandfilter,page).subscribe(data => {
            console.log(data);
            this.collection.data = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];
            
          })
        }
        else{
          this.customerService.getProductBothFilter(this.catefilter,this.brandfilter,page).subscribe(data => {
            console.log(data);
            this.collection.data = data['results'];
        console.log(data['results']);
        this.config.totalItems = data['count'];

          })
        }
  }
  changeCate(value){
    this.catefilter = value;
    console.log(value);
    this.config.currentPage = 1;
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

}
