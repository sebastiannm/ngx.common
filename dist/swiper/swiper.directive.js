import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
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
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", Object)
], SwiperDirective.prototype, "swiper", void 0);
SwiperDirective = tslib_1.__decorate([
    Directive({ selector: '[swiper]' }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], SwiperDirective);
export { SwiperDirective };
//# sourceMappingURL=swiper.directive.js.map