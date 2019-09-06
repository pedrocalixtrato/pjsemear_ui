import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

export enum LAYOUT_TYPE {
  /**
   * - com menu lateral
   *   -> barra escura no topo esquerdo e logo branca (com tamanha variado)
   *   -> padding de 460px para tela grande
   *   -> padding de 260px para tela pequena
   */
  NORMAL = 'NORMAL',
  /**
   * - Sem menu materal:
   *   -> fundo branco
   *   -> logo azul
   *   -> padding de 460px para tela grande
   *   -> padding de 260px para tela pequena
   */
  NO_MENU = 'NO_MENU',
  /**
   *    -> fundo branco
   *    -> logo azul
   *    -> padding de 260px
   *
   */
  EXPANDED = 'EXPANDED'
}

@Component({
  selector: 'sma-plataform-layout-top',
  templateUrl: './plataform-layout-top.component.html',
  styleUrls: ['./plataform-layout-top.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlataformLayoutTopComponent implements OnInit, OnDestroy {
  @Input('layoutType') layoutType: LAYOUT_TYPE = LAYOUT_TYPE.NORMAL;

  globalMenuOpened = false;
  integracaoZW = false;

  constructor(
    private router: Router
  ) { }

  get normal() {
    return this.layoutType === LAYOUT_TYPE.NORMAL;
  }

  get expanded() {
    return this.layoutType === LAYOUT_TYPE.EXPANDED;
  }

  get fullWidth() {
    return this.layoutType === LAYOUT_TYPE.NO_MENU;
  }

  ngOnInit() {
  }

  logoClickHandler() {
  }

  ngOnDestroy() {}

  toggleMenu() {
    this.globalMenuOpened = !this.globalMenuOpened;
  }

}
