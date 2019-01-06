"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var geoip_service_1 = require("./geoip.service");
var GeoIpModule = /** @class */ (function () {
    function GeoIpModule() {
    }
    GeoIpModule = tslib_1.__decorate([
        core_1.NgModule({
            imports: [],
            exports: [geoip_service_1.GeoIpService],
            declarations: [],
            providers: [geoip_service_1.GeoIpService]
        })
    ], GeoIpModule);
    return GeoIpModule;
}());
exports.GeoIpModule = GeoIpModule;
//# sourceMappingURL=geoip.module.js.map