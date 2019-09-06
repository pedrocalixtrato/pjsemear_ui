import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {TabViewModule} from 'primeng/tabview';

import {InputTextModule} from 'primeng/components/inputtext/inputtext';
import {ButtonModule} from 'primeng/components/button/button';
import {NgxPaginationModule} from 'ngx-pagination';
import {KzPaginacaoComponent} from './kz-paginacao/kz-paginacao.component';
import {EnderecoComponent} from './endereco/endereco.component';
import {RouterModule} from '@angular/router';
import {BaseModule} from './base/base.module';
import {BaseSharedModule} from './base/base-shared/base-shared.module.';
import {HttpClientModule} from '@angular/common/http';
import {EnderecoEditComponent} from './endereco/endereco-edit/endereco-edit.component';
import {JwtModule} from '@auth0/angular-jwt';
import {tokenGetter} from './base/login/auth.service';
import {SnotifyModule, SnotifyPosition, SnotifyService, ToastDefaults} from 'ng-snotify';

ToastDefaults.toast.timeout = 3000;
ToastDefaults.toast.position = SnotifyPosition.rightTop;

@NgModule({
  declarations: [
    AppComponent,
    KzPaginacaoComponent,
    EnderecoComponent,
    EnderecoEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabViewModule,
    InputTextModule,
    ButtonModule,
    NgxPaginationModule,
    BaseModule,
    HttpClientModule,
    BaseSharedModule,
    SnotifyModule,
    RouterModule.forRoot([]),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return tokenGetter();
        },
        whitelistedDomains: ['192.99.228.142:8082'],
        blacklistedRoutes: ['http://192.99.228.142:8082/oauth/token']
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [{
    provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService]
})
export class AppModule { }


