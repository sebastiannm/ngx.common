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
const core_1 = require("@angular/core");
let DynamicImageComponent = class DynamicImageComponent {
    constructor(elem) {
        this.elem = elem;
        this.align = 'center center';
        this.sizemode = 'fit';
        this.scale = 1;
        this.loaded = false;
    }
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
    ngOnDestroy() {
        clearTimeout(this.timeoutFunc);
    }
    getSize() {
        this.width = this.elem.nativeElement.children[0].clientWidth;
        this.height = this.elem.nativeElement.children[0].clientHeight;
    }
    getServingUrl() {
        let servingSize;
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
    render() {
        let img = new Image();
        img.onload = () => {
            this.imgUrl = this.servingUrl;
            this.loaded = true;
        };
        img.src = this.servingUrl;
    }
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
        templateUrl: './dynamic-image.html',
        styleUrls: ['./dynamic-image.sass']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object])
], DynamicImageComponent);
exports.DynamicImageComponent = DynamicImageComponent;
var _a;
