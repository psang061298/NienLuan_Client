import { Component, OnInit, OnChanges } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { AuthService } from '../../../services/auth.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.scss']
})
export class BaseAdminComponent implements OnInit {

  constructor(
    private adminService : AdminService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
    if(localStorage.getItem('loaded') == 'false'){
      console.log(localStorage.getItem('loaded'));

      localStorage.setItem('loaded','true');
      console.log(localStorage.getItem('loaded'));
      window.location.reload();
    }
  }

  refresh(): void {
    window.location.reload();
  }


  async reload() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10000)).then(()=>window.location.reload());
}

  // public reload(){
  //   this.adminService.loaded = false;
  //   this.sleep().then(data => {
  //     window.location.reload();
  //   });
  // }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('');
  }
}
