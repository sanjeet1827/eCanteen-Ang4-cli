"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/observable/throw");
exports.mock_sites = [{ Id: "1", Name: "Ansal Towser", contact: "9899138026", address: "", owner: 1 }];
var FakeSiteService = (function () {
    function FakeSiteService() {
    }
    FakeSiteService.prototype.getSites = function () {
        var sitesObservable = new Observable_1.Observable();
        return sitesObservable.do(function (data) { return JSON.stringify(exports.mock_sites); });
    };
    return FakeSiteService;
}());
exports.FakeSiteService = FakeSiteService;
//# sourceMappingURL=FakeSiteService.js.map