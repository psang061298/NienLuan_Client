import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.class';
import { AdminService } from '../../../services/admin/admin.service'
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-category-list-admin',
  templateUrl: './category-list-admin.component.html',
  styleUrls: ['./category-list-admin.component.scss']
})
export class CategoryListAdminComponent implements OnInit {

  constructor(
    private adminService : AdminService
  ) { }

  public categories : Category[] = [];

  public category_now : Category;

  ngOnInit() {
    this.adminService.getcategory().subscribe(data => {
      this.categories = data;
    })
    
  }

  public open(id){
    this.category_now = this.categories[id];
  }

  public close(){
    this.category_now = new Category();
  }

  submited : boolean = false;

  addCategory(reciveform){
    this.submited = true;
    if(reciveform.valid){
      var cateJson = JSON.stringify(this.category_now);
      console.log(cateJson);
      
      this.adminService.putcategory(this.category_now.id,this.category_now).subscribe(data =>{
        console.log(data);
      })
    }
    else{
      console.log(reciveform)
    }
  }
}
