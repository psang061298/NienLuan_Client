import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service' ;
import { Brand } from 'src/app/models/brand.class';


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  brand : Brand[] = [];

  constructor(
    private customerService : CustomerService,
  ) { }

  ngOnInit() {
    this.customerService.getBrand().subscribe(data => {
      this.brand = data;
    })
  }

  // refresh(): void {
  //   window.location.reload();
  // }

}
