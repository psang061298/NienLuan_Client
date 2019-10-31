import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';
import { Promotion } from 'src/app/models/promotion.class';



declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public promotion : Promotion[] = [];

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
}

loadPromotion(){
  this.customerService.getPromotion().subscribe(data => {
    this.promotion = data;
    console.log(data);
    
  })
}


}
