var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var VendorService = (function () {
    function VendorService(_http) {
        this._http = _http;
        this._vendorServiceUrl = 'http://localhost:2434/api/v2/Vendors/';
    }
    VendorService.prototype.loginVendor = function (vendor) {
        return this._http.post(this._vendorServiceUrl + "login", JSON.stringify(vendor))
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    VendorService.prototype.registerVendor = function (vendor) {
        return this._http.post(this._vendorServiceUrl + "register", JSON.stringify(vendor))
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    VendorService.prototype.getAllVendors = function () {
        return this._http.get(this._vendorServiceUrl)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    VendorService.prototype.handleError = function (error) {
        console.error(error);
        return Observable.throw(error.message || 'Server error');
    };
    return VendorService;
}());
VendorService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], VendorService);
export { VendorService };
//# sourceMappingURL=vendor.service.js.map