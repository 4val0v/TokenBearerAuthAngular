import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthTokenService} from '../services/auth-token.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  
      constructor(private router: Router,
        private authService: AuthTokenService) { }
  
      canActivate(): boolean|Observable<boolean>{
          console.log('canActivate');
          console.log(localStorage.getItem('currentUser'));
          let token = localStorage.getItem('currentUser');
          if (token == null) token = "";
          if (localStorage.getItem('currentUser')) {
            return new Observable<boolean>((observer) => { this.authService.validateToken({'token': token})
            .subscribe(result => {
                console.log('result canActivate');
                console.log(result);
                if (result=== true) {
                    return true;
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })});
          } else {
            this.router.navigate(['/login']);
            return false;
          }
          // not logged in so redirect to login page
          
      }
  }