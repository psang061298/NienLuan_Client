import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user.class';
import { AdminService } from '../../../services/admin/admin.service';
import { Subscription } from "rxjs";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy{

  users: User[] = [];
  p: number = 1;
  subcription: Subscription;
  user_id : number;

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

  changeStatus(i,id){
    let is_lock = 'Unlock';
    if(this.users[i].active){
      is_lock = 'Lock'
    }
    Swal.fire({
      title: 'Are you sure?',
      text: is_lock + " this user!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).then((result) => {
      if (result.value) {
        let change = {
          active : !this.users[i].active
        }
        console.log(JSON.stringify(change));
        
        this.adminService.setActive(id,JSON.stringify(change)).subscribe(data => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          this.loadUser();
        })
      }
    })
  }

  selectUser(id){
    this.user_id = id;
  }

  changePass(frm){
    let newPass = frm.controls.newPass.value;
    let confPass = frm.controls.confPass.value;

    if(newPass != confPass){
      Swal.fire('Confirmed password dose not match');
    }
    else{
      let change = {
        password : newPass
      }
      this.adminService.changePass(this.user_id,JSON.stringify(change)).subscribe(data => {
        console.log(data);
        Swal.fire({
          position: 'top-end',
          type: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        window.location.reload();
      })
    }
    
    
  }

}
