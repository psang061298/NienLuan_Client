import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { AdminService } from '../../../services/admin/admin.service';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy{

  users: User[] = [];
  p: number = 1;
  subcription: Subscription;

  constructor(
    private adminService : AdminService
  ) { }

  ngOnInit() {
    console.log(this.users);
    this.loadUser();
  }
  public loadUser(){
    this.subcription = this.adminService.getUser().subscribe(data => {
      this.users = data
    })
  }

  ngOnDestroy(){
    if(this.subcription)
      this.subcription.unsubscribe();
  }


}
