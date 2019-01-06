import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { refCount, publishReplay } from 'rxjs/operators';
let GeoIpService = class GeoIpService {
    constructor(http) {
        this.http = http;
    }
    get() {
        const url = 'https://ecommerce.sebastianmoreno.se/api/geoip';
        return this.http.get(url).pipe(publishReplay(1), refCount());
    }
};
GeoIpService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], GeoIpService);
export { GeoIpService };
//# sourceMappingURL=geoip.service.js.map