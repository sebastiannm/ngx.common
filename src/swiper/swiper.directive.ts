declare const Swiper: any;
import { Directive, ElementRef, OnInit, Input } from '@angular/core';

@Directive({ selector:  '[swiper]' })

export class SwiperDirective implements OnInit {

  @Input() swiper = {};

  constructor(
    private elem: ElementRef
  ) {}

  ngOnInit() {
    setTimeout(() => {
      const slider = new Swiper(this.elem.nativeElement, this.swiper);
    });
  }

}
