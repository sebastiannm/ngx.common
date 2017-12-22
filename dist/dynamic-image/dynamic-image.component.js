"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DynamicImageComponent = /** @class */ (function () {
    function DynamicImageComponent(elem) {
        this.elem = elem;
        this.align = 'center center';
        this.sizemode = 'fit';
        this.scale = 1;
        this.loaded = false;
    }
    DynamicImageComponent.prototype.ngOnInit = function () {
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
    DynamicImageComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.timeoutFunc);
    };
    DynamicImageComponent.prototype.getSize = function () {
        this.width = this.elem.nativeElement.children[0].clientWidth;
        this.height = this.elem.nativeElement.children[0].clientHeight;
    };
    DynamicImageComponent.prototype.getServingUrl = function () {
        var servingSize;
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
    DynamicImageComponent.prototype.resize = function () {
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
    DynamicImageComponent.prototype.render = function () {
        var _this = this;
        var img = new Image();
        img.onload = function () {
            _this.imgUrl = _this.servingUrl;
            _this.loaded = true;
        };
        img.src = this.servingUrl;
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DynamicImageComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], DynamicImageComponent.prototype, "resolution", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DynamicImageComponent.prototype, "align", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DynamicImageComponent.prototype, "sizemode", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], DynamicImageComponent.prototype, "scale", void 0);
    DynamicImageComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-image',
            template: "\n  <div [class.loaded]=\"loaded\" class=\"dynamic-image-content {{align}} {{sizemode}} {{mainSide}}\">\n    <div [style.paddingBottom]=\"spacerStyle\" class=\"spacer\"></div>\n    <img [src]=\"imgUrl\" *ngIf=\"imgUrl\" class=\"large\"/>\n  </div>\n  ",
            styles: ["\n    :host {\n      display: block;\n    }\n\n    .dynamic-image-content {\n      position: relative;\n      overflow: hidden;\n      box-sizing: border-box;\n    }\n\n    .dynamic-image-content.absolute {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n    }\n\n    .dynamic-image-content pre {\n      position: absolute;\n      top: 50%;\n      left: 50%;\n      transform: translate(-50%, -50%);\n      background: white;\n      padding: 0;\n      font-size: .75em;\n      line-height: 1.6em;\n    }\n\n    .dynamic-image-content img {\n      position: absolute;\n      padding: 0;\n      margin: 0;\n      line-height: 0;\n    }\n\n    .dynamic-image-content img.small {\n      opacity: 1;\n    }\n\n    .dynamic-image-content img.large {\n      opacity: 0;\n      transition: opacity .75s;\n    }\n\n    .dynamic-image-content.noplaceholder img.small {\n      visibility: hidden;\n    }\n\n    .dynamic-image-content.fit.height img {\n      height: 100%;\n    }\n\n    .dynamic-image-content.fit.width img {\n      width: 100%;\n    }\n\n    .dynamic-image-content.fit.autoheight {\n      line-height: 0;\n    }\n\n    .dynamic-image-content.fit.autoheight .spacer {\n      display: none;\n    }\n\n    .dynamic-image-content.fit.autoheight img {\n      position: relative;\n      left: initial;\n      right: initial;\n      bottom: initial;\n      top: initial;\n      transform: none;\n      height: 100%;\n      width: auto;\n    }\n\n    .dynamic-image-content.fit.autowidth img {\n      position: absolute;\n      width: 100%;\n    }\n\n    .dynamic-image-content.crop.height img {\n      height: 100%;\n      max-width: initial;\n    }\n\n    .dynamic-image-content.crop.width img {\n      width: 100%;\n      max-height: initial;\n    }\n\n    .dynamic-image-content.loaded img {\n      border: 0;\n    }\n\n    .dynamic-image-content.loaded img.large {\n      opacity: 1;\n    }\n\n    .dynamic-image-content.loaded img.small {\n      opacity: 0;\n      position: absolute;\n    }\n\n    .dynamic-image-content.center img {\n      left: 50%;\n      right: initial;\n      top: 50%;\n      bottom: initial;\n      transform: translateX(-50%) translateY(-50%);\n    }\n\n    .dynamic-image-content.left.center img {\n      top: 50%;\n      right: initial;\n      left: 0;\n      bottom: initial;\n      transform: translateX(0%) translateY(-50%);\n    }\n\n    .dynamic-image-content.right.center img {\n      top: 50%;\n      right: 0;\n      left: initial;\n      bottom: initial;\n      transform: translateX(0%) translateY(-50%);\n    }\n\n    .dynamic-image-content.left.top img {\n      top: 0;\n      right: initial;\n      bottom: initial;\n      left: 0;\n      transform: translateX(0%) translateY(0%);\n    }\n\n    .dynamic-image-content.center.top img {\n      top: 0;\n      right: initial;\n      bottom: initial;\n      left: 50%;\n      transform: translateX(-50%) translateY(0%);\n    }\n\n    .dynamic-image-content.right.top img {\n      top: 0;\n      right: 0;\n      bottom: initial;\n      left: initial;\n      transform: translateX(0%) translateY(0%);\n    }\n\n    .dynamic-image-content.left.bottom img {\n      top: initial;\n      right: initial;\n      bottom: 0;\n      left: 0;\n      transform: translateX(0%) translateY(0%);\n    }\n\n    .dynamic-image-content.center.bottom img {\n      top: initial;\n      right: initial;\n      bottom: 0;\n      left: 50%;\n      transform: translateX(-50%) translateY(0%);\n    }\n\n    .dynamic-image-content.right.bottom img {\n      top: initial;\n      right: 0;\n      bottom: 0;\n      left: initial;\n      transform: translateX(0%) translateY(0%);\n    }\n  "]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef])
    ], DynamicImageComponent);
    return DynamicImageComponent;
}());
exports.DynamicImageComponent = DynamicImageComponent;
//# sourceMappingURL=dynamic-image.component.js.map