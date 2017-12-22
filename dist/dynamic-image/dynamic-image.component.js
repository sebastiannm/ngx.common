"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
        core_1.Input()
    ], DynamicImageComponent.prototype, "url", void 0);
    __decorate([
        core_1.Input()
    ], DynamicImageComponent.prototype, "resolution", void 0);
    __decorate([
        core_1.Input()
    ], DynamicImageComponent.prototype, "align", void 0);
    __decorate([
        core_1.Input()
    ], DynamicImageComponent.prototype, "sizemode", void 0);
    __decorate([
        core_1.Input()
    ], DynamicImageComponent.prototype, "scale", void 0);
    DynamicImageComponent = __decorate([
        core_1.Component({
            selector: 'dynamic-image',
            templateUrl: './dynamic-image.html',
            styleUrls: ['./dynamic-image.sass']
        })
    ], DynamicImageComponent);
    return DynamicImageComponent;
}());
exports.DynamicImageComponent = DynamicImageComponent;
