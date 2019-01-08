import * as tslib_1 from "tslib";
import { Directive, ElementRef, Input } from '@angular/core';
var SwiperDirective = /** @class */ (function () {
    function SwiperDirective(elem) {
        this.elem = elem;
        this.swiper = {};
    }
    SwiperDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            var slider = new Swiper(_this.elem.nativeElement, _this.swiper);
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], SwiperDirective.prototype, "swiper", void 0);
    SwiperDirective = tslib_1.__decorate([
        Directive({ selector: '[swiper]' }),
        tslib_1.__metadata("design:paramtypes", [ElementRef])
    ], SwiperDirective);
    return SwiperDirective;
}());
export { SwiperDirective };
//# sourceMappingURL=swiper.directive.js.map