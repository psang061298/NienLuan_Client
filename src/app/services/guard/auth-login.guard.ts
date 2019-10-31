import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router)
    {}
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        let user = jwtDecode(localStorage.getItem('ACCESS_TOKEN'));
        console.log(user);
        
        if(user.user_id == 1){
            return true;
        }
        else {
            return this.router.navigateByUrl('');;
        }
    }

}
