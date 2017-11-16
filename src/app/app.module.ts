import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { fakeBackendProvider } from './backend/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';


import { routing }        from './app.routes';
import { AppComponent } from './app.component';
import { Test1Component } from './components/test1/test1.component';
import { Test2Component } from './components/test2/test2.component';
import { LoginComponent } from './components/login/login.component';


import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/auth.service';
import { AuthTokenService } from './services/auth-token.service';
import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule
  ],
  providers: [
    ApiService,
    AuthGuard,
    AuthenticationService,
    AuthTokenService,
    UserService,
    // fakeBackendProvider,
    // MockBackend,
    // BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
