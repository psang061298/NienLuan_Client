import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.class';
import { AdminService } from '../../../services/admin/admin.service'



@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.scss']
})
export class ProductListAdminComponent implements OnInit {

  p = 1;
  products : Product[] = [];
  total = 0;
  constructor(
    private adminService : AdminService,
  ) {
  }

  // public items : any[] = [
  // ]
  ngOnInit() {
    this.products = new Array();
    this.loadData(this.p);
    
  }

  loadData(page){
    this.adminService.getProduct(page).subscribe(data => {
      this.products = data['results'];
      this.total = data['count'];
      console.log(this.products);
    })
  }

  changePage(page){
    this.p = page;
    this.loadData(this.p);
  }
  // async sleep() {
  //   await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
  // }

  // public reload(){
  //   this.sleep().then(data => {
  //     window.location.reload();
  //   });
  // }
}
