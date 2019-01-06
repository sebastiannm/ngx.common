"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var dynamic_image_component_1 = require("./dynamic-image.component");
var DynamicImageModule = /** @class */ (function () {
    function DynamicImageModule() {
    }
    DynamicImageModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            exports: [
                dynamic_image_component_1.DynamicImageComponent
            ],
            declarations: [
                dynamic_image_component_1.DynamicImageComponent
            ],
            providers: []
        })
    ], DynamicImageModule);
    return DynamicImageModule;
}());
exports.DynamicImageModule = DynamicImageModule;
//# sourceMappingURL=dynamic-image.module.js.map