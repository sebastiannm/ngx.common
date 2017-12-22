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
let SwiperDirective = class SwiperDirective {
    constructor(elem) {
        this.elem = elem;
        this.swiper = {};
    }
    ngOnInit() {
        setTimeout(() => {
            const slider = new Swiper(this.elem.nativeElement, this.swiper);
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], SwiperDirective.prototype, "swiper", void 0);
SwiperDirective = __decorate([
    core_1.Directive({ selector: '[swiper]' }),
    __metadata("design:paramtypes", [typeof (_a = typeof core_1.ElementRef !== "undefined" && core_1.ElementRef) === "function" && _a || Object])
], SwiperDirective);
exports.SwiperDirective = SwiperDirective;
var _a;