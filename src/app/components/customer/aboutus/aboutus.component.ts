import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../../services/customer.service' ;


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  constructor(
    private customerService : CustomerService,
  ) { }

  ngOnInit() {
    // if (!this.customerService.loaded) {
    //   this.customerService.loaded = true;
    //   this.refresh();
    // }
  }

  // refresh(): void {
  //   window.location.reload();
  // }

}
