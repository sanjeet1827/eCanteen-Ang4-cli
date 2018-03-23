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
var FoodService = (function () {
    function FoodService(_http) {
        this._http = _http;
        this._foodServiceUrl = 'api/products/products.json';
    }
    FoodService.prototype.getFoodItems = function (vendorId, menuType) {
        return this._http.get(this._foodServiceUrl)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    FoodService.prototype.getMenuFoodItems = function (vendorId, menuType, customer) {
        return this._http.get(this._foodServiceUrl)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    FoodService.prototype.getAllFoodItem = function (vendorId) {
        return this._http.get(this._foodServiceUrl)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    FoodService.prototype.saveVendorCurrentMenu = function (vendorMenu, vendorId) {
        return this._http.post(this._foodServiceUrl, vendorMenu)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    FoodService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.message || 'Server error');
    };
    return FoodService;
}());
FoodService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], FoodService);
export { FoodService };
//# sourceMappingURL=food.service.js.map