import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './components/login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {BaseModule} from '../base.module';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BaseModule
  ],
  providers: [
    JwtHelperService
  ]
})
export class LoginModule { }
