import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../login/auth.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgbModule
  ],
  providers: [
    AuthService
  ]

})
export class BaseCoreModule { }
