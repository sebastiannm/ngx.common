import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
var ContentFulService = /** @class */ (function () {
    function ContentFulService() {
    }
    ContentFulService.prototype.setupClient = function (space, accessToken) {
        this.client = createClient({
            space: space,
            accessToken: accessToken
        });
    };
    ContentFulService.prototype.search = function (query) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.client.getEntries(query).then(function (response) {
                resolve(response);
            });
        });
    };
    ContentFulService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ContentFulService);
    return ContentFulService;
}());
export { ContentFulService };
//# sourceMappingURL=contentful.service.js.map