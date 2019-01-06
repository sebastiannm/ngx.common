"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
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
        core_1.Input(),
        tslib_1.__metadata("design:type", Object)
    ], SwiperDirective.prototype, "swiper");
    SwiperDirective = tslib_1.__decorate([
        core_1.Directive({ selector: '[swiper]' }),
        tslib_1.__metadata("design:paramtypes", [core_1.ElementRef])
    ], SwiperDirective);
    return SwiperDirective;
}());
exports.SwiperDirective = SwiperDirective;
//# sourceMappingURL=swiper.directive.js.map