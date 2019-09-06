import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener, Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {Event, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {treinoMenu} from './menu-config/menus/treino';

export interface PlataformLocalMenu {
  menuId: string;
  link?: string[];
  icon?: string;
  iconImage?: string;
  submenus?: PlataformLocalSubmenu[];
}

export interface PlataformLocalSubmenu {
  submenuId: string;
  link: string[];
}

@Component({
  selector: 'sma-menu-local-navigation',
  templateUrl: './menu-local-navigation.component.html',
  styleUrls: ['./menu-local-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuLocalNavigationComponent implements OnInit, OnDestroy, AfterViewInit {
  openedMenu = null;
  private menus: PlataformLocalMenu[] = [];



  private navigationSubscription: Subscription;
  private timeoutHandle;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.openedMenu = null;
          this.fetchMenus();
          this.cd.detectChanges();
        });
      }
    });
  }


  ngAfterViewInit(): void {
    this.timeoutHandle = setTimeout(() => {
      this.fetchMenus();
      this.cd.detectChanges();
    });
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public clickHandler($event: MouseEvent, targetElement) {
    if (!this.isLocalNavigationClick(targetElement)) {
      this.openedMenu = null;
    }
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
    clearTimeout(this.timeoutHandle);
  }

  toggle(menu: PlataformLocalMenu) {
    if (menu.submenus && menu.submenus.length) {
      if (this.openedMenu === menu.menuId) {
        this.openedMenu = null;
      } else {
        this.openedMenu = menu.menuId;
      }
    }
  }
  menuClickHandler(menu: PlataformLocalMenu, $event: MouseEvent) {
    if (!menu.link) {
      this.toggle(menu);
    }
  }


  private isLocalNavigationClick(target) {
    const nav = document.getElementsByClassName('local-navigation-menus')[0];
    return this.isDescendant(nav, target);
  }

  private fetchMenus() {
        this.menus = treinoMenu;
  }

  private isDescendant(parentElement, childElement) {
    let node = childElement.parentNode;
    if (parentElement === childElement) {
      return true;
    } else {
      while (node !== null) {
        if (node === parentElement) {
          return true;
        }
        node = node.parentNode;
      }
      return false;
    }
  }

}

