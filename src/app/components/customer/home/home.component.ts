import { Component, OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CustomerService } from '../../../services/customer.service' ;
import { Category } from 'src/app/models/category.class';



declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  constructor(
    private customerService : CustomerService,
  ) {        

  }
  
  categories : Category[] = [];
ngOnInit() {
  this.customerService.getCategory().subscribe(data =>{
    this.categories = data;
  })
}


}
