import { Directive, Input, OnInit, OnDestroy, ElementRef, HostBinding } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Directive({
  selector: '[appCatSmoothScroll]'
})
export class CatSmoothScrollDirective implements OnInit, OnDestroy {
  @Input('maxHeight') maxHeight = '400px';
  @Input('damping') damping = 0.3;
  @Input('alwaysShowTracks') alwaysShowTracks = false;
  private scroll: Scrollbar;

  constructor(private ref: ElementRef) { }

  @HostBinding('style.max-height')
  _maxHeight = `400px`;

  ngOnInit() {
    this._maxHeight = this.maxHeight;
    this.setUpScroll();
  }

  ngOnDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  private setUpScroll() {
    this.scroll = Scrollbar.init(this.ref.nativeElement, {
      damping: this.damping,
      continuousScrolling: true,
      alwaysShowTracks: this.alwaysShowTracks
    });
  }

}
