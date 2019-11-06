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
  collection = { count: 9, data: [] };
  config = {
    id: 'custom',
    itemsPerPage: 9,
    currentPage: 1,
    totalItems: this.collection.count
  };
 
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

  ngOnInit() {
    this.loadCate();
    this.loadNewProduct();
    this.loadBrand();
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
        
        this.config.totalItems = data['count'];
        this.collection.data = data['results'];
        console.log(data['results']);
      })
    }
    else if(this.catefilter == -1 && this.brandfilter != -1){
          this.customerService.getProductBrandFilter(this.brandfilter,page).subscribe(data => {
            this.collection.data = data['results'];
        console.log(data['results']);
        this.collection.count = data['count'];
            
          })
        }
        else{
          this.customerService.getProductBothFilter(this.catefilter,this.brandfilter,page).subscribe(data => {
            this.collection.data = data['results'];
        console.log(data['results']);
        this.collection.count = data['count'];

          })
        }
  }
  changeCate(value){
    this.catefilter = value;
    console.log(value);
    this.loadProductFilter(this.config.currentPage);
  }

  changeBrand(value){
    this.brandfilter = value;
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
  }
  
  }