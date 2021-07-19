import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
      private router:Router,
      private auth:UserServiceService
    ){}
  
    canActivate(route:ActivatedRouteSnapshot){
     const roles = route.data.roles as Array<string>;
     console.log(roles);
  
     const userDetails:any = this.auth.getUser();
     console.log(userDetails);
     if(userDetails && roles.includes(userDetails.role))
     {
       return true;
     }
     else {
       this.router.navigateByUrl(`/login`);
       return false;
     }
     
    }
  
}
