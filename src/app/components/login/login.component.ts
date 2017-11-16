import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/auth.service';
import { AuthTokenService } from '../../services/auth-token.service';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';

    constructor(
        private router: Router,
        private authService: AuthTokenService) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();
    }

    // login() {
    //     this.loading = true;
    //     this.authenticationService.login(this.model.username, this.model.password)
    //         .subscribe(result => {
    //             console.log(result);
    //             if (result === true) {
    //                 this.router.navigate(['/']);
    //             } else {
    //                 this.error = 'Username or password is incorrect';
    //                 this.loading = false;
    //             }
    //         });
    // }
    login() {
        this.loading = true;
        this.authService.login({ username: this.model.username, password: this.model.password })
            .subscribe(result => {
                console.log(result);
                if (result === true) {
                    this.router.navigate(['/Test2']);
                } else {
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }
}