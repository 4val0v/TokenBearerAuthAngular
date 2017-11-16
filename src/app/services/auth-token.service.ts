import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from './api.service';
import { User } from '../models/user.model';

@Injectable()
export class AuthTokenService {
  public token: string;
  constructor(
    private apiService: ApiService
) { 

  if(localStorage.getItem('currentUser')) {
    this.token = localStorage.getItem('currentUser');
  } else {
    this.token = "";
  }
  
}


  login(body: Object = {}): Observable<any> {
      // get parameters from post request
      let user = new User();
      return this.apiService.post('api/authenticate', body)
      .map((response: any) => {
        // login successful if there's a jwt token in the response
        console.log(response);
        let token = response.token;
        if (token) {
            this.token = token;
            localStorage.setItem('currentUser', token);
            return true;
        } else {
            return false;
        }
    });
  }
  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }
  validateToken(body: Object = {}): Observable<any> {
    console.log('validatetoken');
    console.log(body);
    return this.apiService.post('api/validatetoken', body)
    .map((response: any) => {
        let status = response.status;
        if (status == "Valid") {
            return true;
        } else {
            localStorage.removeItem('currentUser');
            return false;           
        }
    });
}
}
