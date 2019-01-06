"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var contentful_1 = require("contentful");
var ContentFulService = /** @class */ (function () {
    function ContentFulService() {
    }
    ContentFulService.prototype.setupClient = function (space, accessToken) {
        this.client = contentful_1.createClient({
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
        core_1.Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ContentFulService);
    return ContentFulService;
}());
exports.ContentFulService = ContentFulService;
//# sourceMappingURL=contentful.service.js.map