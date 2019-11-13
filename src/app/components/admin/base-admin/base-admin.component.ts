import { Component, OnInit, OnChanges } from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-base-admin',
  templateUrl: './base-admin.component.html',
  styleUrls: ['./base-admin.component.scss']
})
export class BaseAdminComponent implements OnInit {

  constructor(
    private adminService : AdminService,
    private authService : AuthService
  ) { }

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

  logout(){
    this.authService.logout();
  }
}
