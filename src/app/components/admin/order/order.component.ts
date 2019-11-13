import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { orderHistory } from 'src/app/models/oderHistory.class';
import { StepContent } from 'ng-stepper-nav';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  listorder : orderHistory[] = [];
  orderDetail : orderHistory;
  p = 1;
  total = 0;
  process = 25;

  
  constructor(
    private adminService : AdminService,
  ) { }

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder(){
    this.adminService.getOrder(this.p).subscribe(data => {
      this.listorder = data['results'];
      console.log(this.listorder);
      this.total = data['count'];
    })
  }

  showDetail(id){
    this.adminService.getOrderDetail(id).subscribe(data => {
      this.orderDetail = data;

      if(this.orderDetail.status == 'canceled'){
        this.process = 0
      }
      else{
      if(this.orderDetail.status == 'waiting'){
        this.process = 25;
      }else{
        if(this.orderDetail.status == 'pending'){
          this.process = 50;
        }
         else if(this.orderDetail.status == 'shipping'){
          this.process = 75;
        }else{
          this.process = 100;
        }
      }
    }

      this.orderDetail.products.forEach(item1 => {
        let img = '';
        img = item1['product'].images.toString().replace(/'/g,'"');
        item1['product'].images = JSON.parse(img);
    })
      console.log(this.orderDetail);
    })
  }

  pageChange(event){
    console.log(event);
    this.p = event;
    this.loadOrder();
  }

  handle(){
    let change = {
      status : ''
    }

    if(this.process == 25){
      change['status'] = 'pending';
    }
    else{
      if(this.process == 50){
        change['status'] = 'shipping';
      } else {
        change['status'] = 'success';
      }
    }
    Swal.fire({
      title: 'Change status of '+ this.orderDetail['id'],
      text: "Change it to "+ change['status'] ,
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then((result) => {
      if (result.value) {
        this.adminService.changeStatus(this.orderDetail['id'],JSON.stringify(change)).subscribe(data => {
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadOrder();
          this.showDetail(this.orderDetail['id']);
        })
        
      }
      else{
        if(result.dismiss === Swal.DismissReason.cancel){
          Swal.fire({
            title: 'Cancel Order ' + this.orderDetail['id'],
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel it!'
          }).then((result) => {
            if (result.value) {
              change['status'] = 'canceled';
              this.adminService.changeStatus(this.orderDetail['id'],JSON.stringify(change)).subscribe(data => {
                Swal.fire({
                  position: 'center',
                  type: 'success',
                  title: 'Your work has been saved',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.loadOrder();
                this.showDetail(this.orderDetail['id']);
              })
              
            }
          })
        }
        
      }
    })
  }
}
