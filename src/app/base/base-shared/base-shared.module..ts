import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuLocalNavigationComponent} from './menu-local-navigation/menu-local-navigation.component';
import {ContentLayoutComponent} from './content-layout/content-layout.component';
import {PlataformaLayoutComponent} from './layouts/plataforma-layout/plataforma-layout.component';
import {RouterModule} from '@angular/router';
import {RelatorioComponent} from './relatorio/relatorio.component';
import {RelatorioRendererComponent} from './relatorio/relatorio-renderer/relatorio-renderer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DataGridFilterComponent} from './data-grid/data-grid-filter/data-grid-filter.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {DataGridService} from '../base-core/data-grid/data-grid.service';
import {CatSmoothScrollDirective} from './cat-smooth-scroll/cat-smooth-scroll.directive';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PlataformLayoutTopComponent} from './layouts/plataform-layout-top/plataform-layout-top.component';

@NgModule({
  declarations: [
    ContentLayoutComponent,
    PlataformaLayoutComponent,
    MenuLocalNavigationComponent,
    RelatorioComponent,
    NavBarComponent,
    RelatorioRendererComponent,
    DataGridFilterComponent,
    CatSmoothScrollDirective,
    PlataformLayoutTopComponent

  ],
  exports: [
    ContentLayoutComponent,
    RelatorioComponent,
    CatSmoothScrollDirective,
    PerfectScrollbarModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    PerfectScrollbarModule
  ],
  providers: [DataGridService],
  entryComponents: [RelatorioComponent]
})
export class BaseSharedModule {
}
