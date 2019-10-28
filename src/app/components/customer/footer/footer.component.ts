import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.class';
import { CustomerService } from '../../../services/customer.service';
import jwtDecode from 'jwt-decode'



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  agree = false;
  constructor(
    private auth: AuthService,
    private router: Router,
    private customerService : CustomerService,
  ) { }

  ngOnInit() {

  }

  onSubmit(form){
    console.log(form);
    this.auth.login(form.value).subscribe(
      data => {
        let decode = jwtDecode(data.access);
            this.customerService.user_id = decode['user_id'];
            if(decode['user_id'] == 1){
              this.router.navigateByUrl('/admin');
            }
            else{
              this.router.navigateByUrl('/index/home');
              this.delay();
            }
      },
      error => {
        // console.log(error.error.detail);
        Swal.fire(error.error.detail);
      }
    );
  }

  onRegister(form){
    let user = new User();
    console.log(form);
    user.email = form.controls.email.value;
    user.password = form.controls.password.value;
    let userJSON = JSON.stringify(user);
    this.customerService.register(userJSON).subscribe(data => {
      console.log(data);
    })
  }

  async sleep() {
    await new Promise(resolve => setTimeout(()=>resolve(), 10)).then(()=>console.log("fired"));
  }

  public delay(){
    this.sleep().then(data => {
      window.location.reload();
    });
  }

}
