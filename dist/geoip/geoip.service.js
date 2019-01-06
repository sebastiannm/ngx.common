"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var GeoIpService = /** @class */ (function () {
    function GeoIpService(http) {
        this.http = http;
    }
    GeoIpService.prototype.get = function () {
        var url = 'https://ecommerce.sebastianmoreno.se/api/geoip';
        return this.http.get(url).pipe(operators_1.publishReplay(1), operators_1.refCount());
    };
    GeoIpService = tslib_1.__decorate([
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [http_1.HttpClient])
    ], GeoIpService);
    return GeoIpService;
}());
exports.GeoIpService = GeoIpService;
//# sourceMappingURL=geoip.service.js.map