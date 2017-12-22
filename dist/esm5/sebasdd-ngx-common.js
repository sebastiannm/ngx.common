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
var BlogUtils = (function () {
    function BlogUtils() {
    }
    /**
     * @param {?} htmlString
     * @param {?} isMobile
     * @return {?}
     */
    BlogUtils.massageText = /**
     * @param {?} htmlString
     * @param {?} isMobile
     * @return {?}
     */
    function (htmlString, isMobile) {
        if (!htmlString) {
            return (htmlString = '');
        }
        var /** @type {?} */ textElement = document.createElement('div');
        textElement.innerHTML = htmlString;
        var /** @type {?} */ imgs = textElement.querySelectorAll('img');
        for (var /** @type {?} */ i = 0; i < imgs.length; i++) {
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
        var /** @type {?} */ as = textElement.querySelectorAll('a');
        for (var /** @type {?} */ i = 0; i < as.length; i++) {
            as.item(i).setAttribute('target', '_blank');
        }
        return textElement.innerHTML;
    };
    return BlogUtils;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var GeoIpService = (function () {
    function GeoIpService(http$$1) {
        this.http = http$$1;
    }
    /**
     * @return {?}
     */
    GeoIpService.prototype.get = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ url = 'https://api.sebastianmoreno.se/api/geoip';
        return this.http.get(url)
            .pipe(publishReplay(1), refCount());
    };
    GeoIpService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    GeoIpService.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return GeoIpService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicImageComponent = (function () {
    function DynamicImageComponent(elem) {
        this.elem = elem;
        this.align = 'center center';
        this.sizemode = 'fit';
        this.scale = 1;
        this.loaded = false;
    }
    /**
     * @return {?}
     */
    DynamicImageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.assetRatio = this.resolution.width / this.resolution.height;
        this.spacerStyle = this.resolution.height / this.resolution.width * 100 + "%";
        this.timeoutFunc = setTimeout(function () {
            _this.getSize();
            if (_this.height > 0 && _this.width == 0) {
                _this.mainSide = 'autoheight';
            }
            else if (_this.width > 0 && _this.height == 0) {
                _this.mainSide = 'autowidth';
            }
            else {
                if (_this.sizemode == 'crop') {
                    _this.mainSide = _this.assetRatio > 1 ? 'height' : 'width';
                }
                else {
                    _this.mainSide = _this.assetRatio < 1 ? 'height' : 'width';
                }
            }
            _this.resize();
            _this.getServingUrl();
        });
    };
    /**
     * @return {?}
     */
    DynamicImageComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        clearTimeout(this.timeoutFunc);
    };
    /**
     * @return {?}
     */
    DynamicImageComponent.prototype.getSize = /**
     * @return {?}
     */
    function () {
        this.width = this.elem.nativeElement.children[0].clientWidth;
        this.height = this.elem.nativeElement.children[0].clientHeight;
    };
    /**
     * @return {?}
     */
    DynamicImageComponent.prototype.getServingUrl = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ servingSize;
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
    };
    /**
     * @return {?}
     */
    DynamicImageComponent.prototype.resize = /**
     * @return {?}
     */
    function () {
        if (this.mainSide !== 'autoheight' && this.mainSide !== 'autowidth') {
            this.wrapperRatio = this.width / this.height;
            if (this.sizemode === 'crop') {
                this.mainSide = this.assetRatio < this.wrapperRatio ? 'width' : 'height';
            }
            else {
                this.mainSide = this.assetRatio > this.wrapperRatio ? 'width' : 'height';
            }
        }
    };
    /**
     * @return {?}
     */
    DynamicImageComponent.prototype.render = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ img = new Image();
        img.onload = function () {
            _this.imgUrl = _this.servingUrl;
            _this.loaded = true;
        };
        img.src = this.servingUrl;
    };
    DynamicImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'dynamic-image',
                    template: "\n  <div [class.loaded]=\"loaded\" class=\"dynamic-image-content {{align}} {{sizemode}} {{mainSide}}\">\n    <div [style.paddingBottom]=\"spacerStyle\" class=\"spacer\"></div>\n    <img [src]=\"imgUrl\" *ngIf=\"imgUrl\" class=\"large\"/>\n  </div>\n  ",
                    styles: ["\n    :host {\n      display: block;\n    }\n\n    .dynamic-image-content {\n      position: relative;\n      overflow: hidden;\n      box-sizing: border-box;\n    }\n\n    .dynamic-image-content.absolute {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n    }\n\n    .dynamic-image-content pre {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      background: white;\n      padding: 0;\n      font-size: .75em;\n      line-height: 1.6em;\n    }\n\n    .dynamic-image-content img {\n      position: absolute;\n      padding: 0;\n      margin: 0;\n      line-height: 0;\n    }\n\n    .dynamic-image-content img.small {\n      opacity: 1;\n    }\n\n    .dynamic-image-content img.large {\n      opacity: 0;\n      transition: opacity .75s;\n    }\n\n    .dynamic-image-content.noplaceholder img.small {\n      visibility: hidden;\n    }\n\n    .dynamic-image-content.fit.height img {\n      height: 100%;\n    }\n\n    .dynamic-image-content.fit.width img {\n      width: 100%;\n    }\n\n    .dynamic-image-content.fit.autoheight {\n      line-height: 0;\n    }\n\n    .dynamic-image-content.fit.autoheight .spacer {\n      display: none;\n    }\n\n    .dynamic-image-content.fit.autoheight img {\n      position: relative;\n      left: initial;\n      right: initial;\n      bottom: initial;\n      top: initial;\n      transform: none;\n      height: 100%;\n      width: auto;\n    }\n\n    .dynamic-image-content.fit.autowidth img {\n      position: absolute;\n      width: 100%;\n    }\n\n    .dynamic-image-content.crop.height img {\n      height: 100%;\n      max-width: initial;\n    }\n\n    .dynamic-image-content.crop.width img {\n      width: 100%;\n      max-height: initial;\n    }\n\n    .dynamic-image-content.loaded img {\n      border: 0;\n    }\n\n    .dynamic-image-content.loaded img.large {\n      opacity: 1;\n    }\n\n    .dynamic-image-content.loaded img.small {\n      opacity: 0;\n      position: absolute;\n    }\n\n    .dynamic-image-content.center img {\n      left: 50%;\n      right: initial;\n      top: 50%;\n      bottom: initial;\n      transform: translateX(-50%) translateY(-50%);\n    }\n\n    .dynamic-image-content.left.center img {\n      top: 50%;\n      right: initial;\n      left: 0;\n      bottom: initial;\n      transform: translateX(0%) translateY(-50%);\n    }\n\n    .dynamic-image-content.right.center img {\n      top: 50%;\n      right: 0;\n      left: initial;\n      bottom: initial;\n      transform: translateX(0%) translateY(-50%);\n    }\n\n    .dynamic-image-content.left.top img {\n      top: 0;\n      right: initial;\n      bottom: initial;\n      left: 0;\n      transform: translateX(0%) translateY(0%);\n    }\n\n    .dynamic-image-content.center.top img {\n      top: 0;\n      right: initial;\n      bottom: initial;\n      left: 50%;\n      transform: translateX(-50%) translateY(0%);\n    }\n\n    .dynamic-image-content.right.top img {\n      top: 0;\n      right: 0;\n      bottom: initial;\n      left: initial;\n      transform: translateX(0%) translateY(0%);\n    }\n\n    .dynamic-image-content.left.bottom img {\n      top: initial;\n      right: initial;\n      bottom: 0;\n      left: 0;\n      transform: translateX(0%) translateY(0%);\n    }\n\n    .dynamic-image-content.center.bottom img {\n      top: initial;\n      right: initial;\n      bottom: 0;\n      left: 50%;\n      transform: translateX(-50%) translateY(0%);\n    }\n\n    .dynamic-image-content.right.bottom img {\n      top: initial;\n      right: 0;\n      bottom: 0;\n      left: initial;\n      transform: translateX(0%) translateY(0%);\n    }\n  "]
                },] },
    ];
    /** @nocollapse */
    DynamicImageComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    DynamicImageComponent.propDecorators = {
        "url": [{ type: Input },],
        "resolution": [{ type: Input },],
        "align": [{ type: Input },],
        "sizemode": [{ type: Input },],
        "scale": [{ type: Input },],
    };
    return DynamicImageComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DynamicImageModule = (function () {
    function DynamicImageModule() {
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
    DynamicImageModule.ctorParameters = function () { return []; };
    return DynamicImageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SafeHtmlPipe = (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    SafeHtmlPipe.prototype.transform = /**
     * @param {?} value
     * @param {?} args
     * @return {?}
     */
    function (value, args) {
        if (!value) {
            return '';
        }
        return this.sanitizer.bypassSecurityTrustHtml(value);
    };
    SafeHtmlPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'pipe-safeHtml'
                },] },
    ];
    /** @nocollapse */
    SafeHtmlPipe.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    return SafeHtmlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SwiperDirective = (function () {
    function SwiperDirective(elem) {
        this.elem = elem;
        this.swiper = {};
    }
    /**
     * @return {?}
     */
    SwiperDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            var /** @type {?} */ slider = new Swiper(_this.elem.nativeElement, _this.swiper);
        });
    };
    SwiperDirective.decorators = [
        { type: Directive, args: [{ selector: '[swiper]' },] },
    ];
    /** @nocollapse */
    SwiperDirective.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    SwiperDirective.propDecorators = {
        "swiper": [{ type: Input },],
    };
    return SwiperDirective;
}());

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
