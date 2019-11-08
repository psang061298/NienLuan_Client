import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { orderHistory } from 'src/app/models/oderHistory.class';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  listorder : orderHistory[] = [];

  constructor(
    private adminService : AdminService,
  ) { }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder(){
    this.adminService.getOrder().subscribe(data => {
      this.listorder = data;
    })
  }

}
