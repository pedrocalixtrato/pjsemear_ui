import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LAYOUT_TYPE} from '../plataform-layout-top/plataform-layout-top.component';


@Component({
  selector: 'sma-plataforma-layout',
  templateUrl: './plataforma-layout.component.html',
  styleUrls: ['./plataforma-layout.component.scss']
})
export class PlataformaLayoutComponent implements OnInit {
  fullscreen = false;
  showContent = true;

  layoutType: LAYOUT_TYPE = LAYOUT_TYPE.NORMAL;

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.route.queryParams.subscribe(params => {
        this.fullscreen = params.fullscreen;
        this.updateLayoutType();
        this.cd.detectChanges();
      });
    });
  }

  get scrollMaxHeight() {
    if (this.fullscreen) {
      return `calc(100vh - 95px)`;
    } else {
      return `100vh`;
    }
  }

  get _LAYOUT_TYPE() { return LAYOUT_TYPE; }


  private updateLayoutType() {
  }

}
