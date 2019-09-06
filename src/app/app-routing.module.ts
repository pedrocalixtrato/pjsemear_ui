import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PlataformaLayoutComponent} from './base/base-shared/layouts/plataforma-layout/plataforma-layout.component';
import {EnderecoComponent} from './endereco/endereco.component';
import {EnderecoEditComponent} from './endereco/endereco-edit/endereco-edit.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: './base/login/login.module#LoginModule'
  },
  {
    path: '',
    component: PlataformaLayoutComponent,
    children: [
      {
        path: 'enderecos',
        component: EnderecoComponent
      },
      {
        path: 'enderecos/novo',
        component: EnderecoEditComponent
      },
      {
        path: 'enderecos/:id',
        component: EnderecoEditComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  declarations: [],
  providers: []
})
export class AppRoutingModule {
}


