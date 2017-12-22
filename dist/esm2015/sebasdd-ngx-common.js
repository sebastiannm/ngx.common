/**
 * @license angular-library-starter
 * MIT license
 */

import { Component, Directive, ElementRef, Injectable, Input, NgModule, Pipe } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { publishReplay, refCount } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class BlogUtils {
    /**
     * @param {?} htmlString
     * @param {?} isMobile
     * @return {?}
     */
    static massageText(htmlString, isMobile) {
        if (!htmlString) {
            return (htmlString = '');
        }
        const /** @type {?} */ textElement = document.createElement('div');
        textElement.innerHTML = htmlString;
        const /** @type {?} */ imgs = textElement.querySelectorAll('img');
        for (let /** @type {?} */ i = 0; i < imgs.length; i++) {
            imgs.item(i).src = imgs
                .item(i)
                .src.replace('downloads.contentful', 'images.contentful');
            if (!imgs.item(i).src.includes('.gif')) {
                if (isMobile) {
                    imgs.item(i).src += '?w=700';
                }
                else {
                    imgs.item(i).src += '?w=1500';
                }
            }
        }
        const /** @type {?} */ as = textElement.querySelectorAll('a');
        for (let /** @type {?} */ i = 0; i < as.length; i++) {
            as.item(i).setAttribute('target', '_blank');
        }
        return textElement.innerHTML;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class GeoIpService {
    /**
     * @param {?} http
     */
    constructor(http$$1) {
        this.http = http$$1;
    }
    /**
     * @return {?}
     */
    get() {
        const /** @type {?} */ url = 'https://api.sebastianmoreno.se/api/geoip';
        return this.http.get(url)
            .pipe(publishReplay(1), refCount());
    }
}
GeoIpService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
GeoIpService.ctorParameters = () => [
    { type: HttpClient, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicImageComponent {
    /**
     * @param {?} elem
     */
    constructor(elem) {
        this.elem = elem;
        this.align = 'center center';
        this.sizemode = 'fit';
        this.scale = 1;
        this.loaded = false;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.assetRatio = this.resolution.width / this.resolution.height;
        this.spacerStyle = `${this.resolution.height / this.resolution.width * 100}%`;
        this.timeoutFunc = setTimeout(() => {
            this.getSize();
            if (this.height > 0 && this.width == 0) {
                this.mainSide = 'autoheight';
            }
            else if (this.width > 0 && this.height == 0) {
                this.mainSide = 'autowidth';
            }
            else {
                if (this.sizemode == 'crop') {
                    this.mainSide = this.assetRatio > 1 ? 'height' : 'width';
                }
                else {
                    this.mainSide = this.assetRatio < 1 ? 'height' : 'width';
                }
            }
            this.resize();
            this.getServingUrl();
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        clearTimeout(this.timeoutFunc);
    }
    /**
     * @return {?}
     */
    getSize() {
        this.width = this.elem.nativeElement.children[0].clientWidth;
        this.height = this.elem.nativeElement.children[0].clientHeight;
    }
    /**
     * @return {?}
     */
    getServingUrl() {
        let /** @type {?} */ servingSize;
        if (this.mainSide === 'autoheight') {
            servingSize = Math.round(Math.max(this.height, this.height * this.assetRatio));
        }
        else if (this.sizemode === 'crop' && this.height) {
            if (this.assetRatio <= this.wrapperRatio) {
                servingSize = Math.round(Math.max(this.width, this.width / this.assetRatio));
            }
            else {
                servingSize = Math.round(Math.max(this.height, this.height * this.assetRatio));
            }
        }
        else {
            if (this.assetRatio <= this.wrapperRatio && this.height) {
                servingSize = Math.round(Math.max(this.height, this.height * this.assetRatio));
            }
            else {
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
    /**
     * @return {?}
     */
    resize() {
        if (this.mainSide !== 'autoheight' && this.mainSide !== 'autowidth') {
            this.wrapperRatio = this.width / this.height;
            if (this.sizemode === 'crop') {
                this.mainSide = this.assetRatio < this.wrapperRatio ? 'width' : 'height';
            }
            else {
                this.mainSide = this.assetRatio > this.wrapperRatio ? 'width' : 'height';
            }
        }
    }
    /**
     * @return {?}
     */
    render() {
        let /** @type {?} */ img = new Image();
        img.onload = () => {
            this.imgUrl = this.servingUrl;
            this.loaded = true;
        };
        img.src = this.servingUrl;
    }
}
DynamicImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'dynamic-image',
                template: `
  <div [class.loaded]="loaded" class="dynamic-image-content {{align}} {{sizemode}} {{mainSide}}">
    <div [style.paddingBottom]="spacerStyle" class="spacer"></div>
    <img [src]="imgUrl" *ngIf="imgUrl" class="large"/>
  </div>
  `,
                styles: [`
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
            },] },
];
/** @nocollapse */
DynamicImageComponent.ctorParameters = () => [
    { type: ElementRef, },
];
DynamicImageComponent.propDecorators = {
    "url": [{ type: Input },],
    "resolution": [{ type: Input },],
    "align": [{ type: Input },],
    "sizemode": [{ type: Input },],
    "scale": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DynamicImageModule {
}
DynamicImageModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                exports: [
                    DynamicImageComponent
                ],
                declarations: [
                    DynamicImageComponent
                ],
                providers: [],
            },] },
];
/** @nocollapse */
DynamicImageModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SafeHtmlPipe {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    transform(value, args) {
        if (!value) {
            return '';
        }
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
SafeHtmlPipe.decorators = [
    { type: Pipe, args: [{
                name: 'pipe-safeHtml'
            },] },
];
/** @nocollapse */
SafeHtmlPipe.ctorParameters = () => [
    { type: DomSanitizer, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SwiperDirective {
    /**
     * @param {?} elem
     */
    constructor(elem) {
        this.elem = elem;
        this.swiper = {};
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        setTimeout(() => {
            const /** @type {?} */ slider = new Swiper(this.elem.nativeElement, this.swiper);
        });
    }
}
SwiperDirective.decorators = [
    { type: Directive, args: [{ selector: '[swiper]' },] },
];
/** @nocollapse */
SwiperDirective.ctorParameters = () => [
    { type: ElementRef, },
];
SwiperDirective.propDecorators = {
    "swiper": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Angular library starter
 * Build an Angular library compatible with AoT compilation & Tree shaking
 * Copyright Roberto Simonetti
 * MIT license
 * https://github.com/robisim74/angular-library-starter
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { BlogUtils, GeoIpService, DynamicImageModule, SafeHtmlPipe, SwiperDirective, DynamicImageComponent as ɵa };
//# sourceMappingURL=sebasdd-ngx-common.js.map
