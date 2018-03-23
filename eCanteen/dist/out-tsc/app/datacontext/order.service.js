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
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
var OrderService = (function () {
    function OrderService(_http) {
        this._http = _http;
        this._orderServiceUrl = "http://localhost:2434/api/v2/Orders/";
    }
    OrderService.prototype.placeOrder = function (order) {
        return this._http.post(this._orderServiceUrl, order)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.getConfirmedOrderDetail = function (orderId) {
        return this._http.get(this._orderServiceUrl)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.getVendorOrders = function (vendorId, menuType) {
        var httpParams = new HttpParams().set("vendorId", vendorId)
            .set("menuType", menuType.toString());
        return this._http.get(this._orderServiceUrl + "VendorOredrs", { params: httpParams })
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.getMenuWiseStatusCount = function (vendorId, menuType) {
        var httpParams = new HttpParams().set("vendorId", vendorId)
            .set("menuType", menuType.toString())
            .set("tp", "true");
        return this._http.get(this._orderServiceUrl + "MenuWiseOredrs", { params: httpParams })
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.updateOrderStatus = function (orderId, vendorId, menuType) {
        var httpParams = new HttpParams().set("orderId", orderId)
            .set("vendorId", vendorId)
            .set("menuType", menuType.toString());
        return this._http.get(this._orderServiceUrl, { params: httpParams })
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.acceptOrder = function (orderId, vendorId) {
        var httpParams = new HttpParams().set("orderId", orderId)
            .set("vendorId", vendorId);
        return this._http.get(this._orderServiceUrl, { params: httpParams })
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.getCustomerOrderHistory = function (customerId, customerDetail) {
        return this._http.get(this._orderServiceUrl)
            .map(function (response) { return response; })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    OrderService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.message || 'Server error');
    };
    return OrderService;
}());
OrderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [HttpClient])
], OrderService);
export { OrderService };
//# sourceMappingURL=order.service.js.map