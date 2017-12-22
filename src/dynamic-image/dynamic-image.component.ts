import { Component, Input, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'dynamic-image',
  template: `
  <div [class.loaded]="loaded" class="dynamic-image-content {{align}} {{sizemode}} {{mainSide}}">
    <div [style.paddingBottom]="spacerStyle" class="spacer"></div>
    <img [src]="imgUrl" *ngIf="imgUrl" class="large"/>
  </div>
  `,
  styleUrls: [`
    \:host {
      display: block;
    }

    .dynamic-image-content {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    .dynamic-image-content.absolute {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .dynamic-image-content pre {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 0;
      font-size: .75em;
      line-height: 1.6em;
    }

    .dynamic-image-content img {
      position: absolute;
      padding: 0;
      margin: 0;
      line-height: 0;
    }

    .dynamic-image-content img.small {
      opacity: 1;
    }

    .dynamic-image-content img.large {
      opacity: 0;
      transition: opacity .75s;
    }

    .dynamic-image-content.noplaceholder img.small {
      visibility: hidden;
    }

    .dynamic-image-content.fit.height img {
      height: 100%;
    }

    .dynamic-image-content.fit.width img {
      width: 100%;
    }

    .dynamic-image-content.fit.autoheight {
      line-height: 0;
    }

    .dynamic-image-content.fit.autoheight .spacer {
      display: none;
    }

    .dynamic-image-content.fit.autoheight img {
      position: relative;
      left: initial;
      right: initial;
      bottom: initial;
      top: initial;
      transform: none;
      height: 100%;
      width: auto;
    }

    .dynamic-image-content.fit.autowidth img {
      position: absolute;
      width: 100%;
    }

    .dynamic-image-content.crop.height img {
      height: 100%;
      max-width: initial;
    }

    .dynamic-image-content.crop.width img {
      width: 100%;
      max-height: initial;
    }

    .dynamic-image-content.loaded img {
      border: 0;
    }

    .dynamic-image-content.loaded img.large {
      opacity: 1;
    }

    .dynamic-image-content.loaded img.small {
      opacity: 0;
      position: absolute;
    }

    .dynamic-image-content.center img {
      left: 50%;
      right: initial;
      top: 50%;
      bottom: initial;
      transform: translateX(-50%) translateY(-50%);
    }

    .dynamic-image-content.left.center img {
      top: 50%;
      right: initial;
      left: 0;
      bottom: initial;
      transform: translateX(0%) translateY(-50%);
    }

    .dynamic-image-content.right.center img {
      top: 50%;
      right: 0;
      left: initial;
      bottom: initial;
      transform: translateX(0%) translateY(-50%);
    }

    .dynamic-image-content.left.top img {
      top: 0;
      right: initial;
      bottom: initial;
      left: 0;
      transform: translateX(0%) translateY(0%);
    }

    .dynamic-image-content.center.top img {
      top: 0;
      right: initial;
      bottom: initial;
      left: 50%;
      transform: translateX(-50%) translateY(0%);
    }

    .dynamic-image-content.right.top img {
      top: 0;
      right: 0;
      bottom: initial;
      left: initial;
      transform: translateX(0%) translateY(0%);
    }

    .dynamic-image-content.left.bottom img {
      top: initial;
      right: initial;
      bottom: 0;
      left: 0;
      transform: translateX(0%) translateY(0%);
    }

    .dynamic-image-content.center.bottom img {
      top: initial;
      right: initial;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%) translateY(0%);
    }

    .dynamic-image-content.right.bottom img {
      top: initial;
      right: 0;
      bottom: 0;
      left: initial;
      transform: translateX(0%) translateY(0%);
    }
  `]
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
