import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-product-list-admin',
  templateUrl: './product-list-admin.component.html',
  styleUrls: ['./product-list-admin.component.scss']
})
export class ProductListAdminComponent implements OnInit {

  p = 1;
  constructor() {
    for (let i = 1; i <= 100; i++) {
      var item = {
        id : 0,
        name : '',
        status : true,
      }
      item.id = i;
      item.name = `item ${i}`;
      item.status = true;
      this.items.push(item);
    }
  }

  public items : any[] = [
  ]
  ngOnInit() {
    
  }
  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
  }

  public reload(){
    this.sleep().then(data => {
      window.location.reload();
    });
  }
}
