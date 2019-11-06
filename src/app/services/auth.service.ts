import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.class';
// import { JwtRespose } from '../models/jwt-response.class';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
// var jwtDecode = require('jwt-decode');



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER: string = 'http://127.0.0.1:8000';
  authSubject = new BehaviorSubject(false);
  public token: string;
  constructor(private http: HttpClient, private router: Router) {}

  login(userf: User): Observable<User> {
    let userJSON = JSON.stringify(userf);
    console.log(userJSON);
    
    return this.http
      .post<User>(`${this.AUTH_SERVER}/login/`, userJSON,httpOptions)
      .pipe(
        map(user => {
          let decode = '';
          if (user && user.access) {
              
            this.saveToken(user.access);
          }
          return user;
        })
      );
  }

  logout() {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.clear()
    this.router.navigateByUrl('');
  }

  private saveToken(
    token: string,
  ): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    this.token = token;
  }
}
