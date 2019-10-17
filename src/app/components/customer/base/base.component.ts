import { Component, OnInit, OnChanges } from '@angular/core';
import { CustomerService } from '../../../services/customer.service' ;


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit , OnChanges {

  constructor(
    private customerService : CustomerService
  ) { }

  ngOnInit() {
    // if (this.customerService.loaded) {
    //   this.customerService.loaded = true;
    //   this.refresh();
    // }
  }

  ngOnChanges(): void {
    this.refresh();
  }

  refresh(): void {
    window.location.reload();
  }

}
