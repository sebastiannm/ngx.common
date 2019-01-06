"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var geoip_service_1 = require("./geoip.service");
var GeoIpModule = /** @class */ (function () {
    function GeoIpModule() {
    }
    GeoIpModule = __decorate([
        core_1.NgModule({
            imports: [],
            exports: [geoip_service_1.GeoIpService],
            declarations: [geoip_service_1.GeoIpService],
            providers: [geoip_service_1.GeoIpService]
        })
    ], GeoIpModule);
    return GeoIpModule;
}());
exports.GeoIpModule = GeoIpModule;
