import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';


import { Test1Component } from './components/test1/test1.component';
import { Test2Component } from './components/test2/test2.component';
import { LoginComponent } from './components/login/login.component';

const appRoutes: Routes = [
    // { path: '', redirectTo: 'Test1', pathMatch: 'full' },
    { path: 'Test2', component: Test2Component, canActivate: [AuthGuard] },
    { path: 'Test1', component: Test1Component},
    { path: 'login', component: LoginComponent},
    // { path: '**', redirectTo: '' }
];


export const routing = RouterModule.forRoot(appRoutes);  