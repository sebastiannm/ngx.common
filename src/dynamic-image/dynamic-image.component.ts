import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'dynamic-image',
  template: `
  <div [class.loaded]="loaded" class="dynamic-image-content {{align}} {{sizemode}} {{mainSide}}">
    <div [style.paddingBottom]="spacerStyle" class="spacer"></div>
    <img [src]="imgUrl" *ngIf="imgUrl" class="large"/>
  </div>
  `,
  styleUrls: ['dynamic-image.sass']
})
export class DynamicImageComponent implements OnInit, OnDestroy {

  @Input() url: string;
  @Input() resolution: any;
  @Input() align: string = 'center center';
  @Input() sizemode: string = 'fit';
  @Input() scale: number = 1;
  public loaded: boolean = false;
  public spacerStyle: any;
  public assetRatio: number;
  public mainSide: string;
  private wrapperRatio: number;
  private width: number;
  private height: number;
  public imgUrl: string;
  private servingUrl: string;
  private servingSize: any;
  private timeoutFunc;

  constructor(
    private elem: ElementRef
  ){ }

  ngOnInit() {
    this.assetRatio = this.resolution.width / this.resolution.height;
    this.spacerStyle = `${this.resolution.height / this.resolution.width * 100}%`;

    this.timeoutFunc = setTimeout(() => {
      this.getSize();

      if (this.height > 0 && this.width == 0) {
        this.mainSide = 'autoheight'
      } else if (this.width > 0 && this.height == 0) {
        this.mainSide = 'autowidth'
      } else {
        if (this.sizemode == 'crop') {
          this.mainSide = this.assetRatio > 1 ? 'height' : 'width';
        } else {
          this.mainSide = this.assetRatio < 1 ? 'height' : 'width';
        }
      }

      this.resize();
      this.getServingUrl();
    });
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutFunc);
  }

  getSize() {
    this.width  = this.elem.nativeElement.children[0].clientWidth;
    this.height = this.elem.nativeElement.children[0].clientHeight;
  }

  getServingUrl() {
    let servingSize: any;

    if (this.mainSide === 'autoheight') {
      servingSize = Math.round(Math.max(this.height, this.height * this.assetRatio));
    } else if (this.sizemode === 'crop' && this.height) {
      if (this.assetRatio <= this.wrapperRatio) {
        servingSize = Math.round(Math.max(this.width, this.width / this.assetRatio));
      } else {
        servingSize = Math.round(Math.max(this.height, this.height * this.assetRatio));
      }
    } else {
      if (this.assetRatio <= this.wrapperRatio && this.height) {
        servingSize = Math.round(Math.max(this.height, this.height * this.assetRatio));
      } else {
        servingSize = Math.round(Math.max(this.width, this.width / this.assetRatio));
      }
    }
    servingSize = Math.min(servingSize * (Math.ceil(window.devicePixelRatio) || 1), 4000);
    servingSize = parseInt(servingSize);

    if (servingSize === this.servingSize) {
      this.loaded = true;
      return;
    }

    this.servingSize = Math.max(servingSize, 60);
    this.servingUrl = this.url + '?w=' + (this.servingSize * this.scale);

    this.render();
  }

  resize() {
    if (this.mainSide !== 'autoheight' && this.mainSide !== 'autowidth') {
      this.wrapperRatio = this.width / this.height;
      if (this.sizemode === 'crop') {
        this.mainSide = this.assetRatio < this.wrapperRatio ? 'width' : 'height';
      } else {
        this.mainSide = this.assetRatio > this.wrapperRatio ? 'width' : 'height';
      }
    }
  }

  render(): void {
    let img: any = new Image();

    img.onload = () => {
      this.imgUrl = this.servingUrl;
      this.loaded = true;
    };

    img.src = this.servingUrl;
  }
}
