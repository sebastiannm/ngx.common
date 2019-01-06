import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { createClient } from 'contentful';
let ContentFulService = class ContentFulService {
    constructor() { }
    setupClient(space, accessToken) {
        this.client = createClient({
            space,
            accessToken
        });
    }
    search(query) {
        return new Promise(resolve => {
            this.client.getEntries(query).then((response) => {
                resolve(response);
            });
        });
    }
};
ContentFulService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [])
], ContentFulService);
export { ContentFulService };
//# sourceMappingURL=contentful.service.js.map