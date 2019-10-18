import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { User } from 'src/app/models/user.class';
import { CustomerService } from '../../../services/customer.service'


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
        this.router.navigateByUrl('/admin');
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

}
