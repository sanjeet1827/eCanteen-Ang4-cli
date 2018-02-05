"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var order_service_1 = require("../../datacontext/order.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
var AppModels_1 = require("../../Models/AppModels");
var SignupSinginComponent = (function () {
    function SignupSinginComponent(_orderService, _httpHelper, route) {
        this._orderService = _orderService;
        this._httpHelper = _httpHelper;
        this.route = route;
        this.vModel = new AppModels_1.OrderStatusData();
        this.vModel.orderStatus = new Array();
        this.vModel.displayVendorSlider = false;
        this.vModel.popUpNotification = false;
        this.vModel.acceptedOrder = new AppModels_1.OrderStatus();
        this.vModel.orderAccepetd = false;
    }
    SignupSinginComponent.prototype.loadOrders = function (vendorId, menuType) {
        var _this = this;
        this._orderService.getVendorOrders(vendorId, menuType).subscribe(function (ordersStatus) {
            _this.vModel.orderStatus = ordersStatus;
            _this.loadOrderDetail(_this.vModel.orderStatus[0].order.id);
        });
    };
    SignupSinginComponent.prototype.loadOrderDetail = function (orderId) {
        var orderDetail = this.vModel.orderStatus.filter(function (data) {
            return data.order.id === orderId;
        });
        this.vModel.orderDetail = orderDetail[0];
    };
    SignupSinginComponent.prototype.getBreakfastOrderCount = function (vendorId, menuType) {
        var _this = this;
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe(function (data) {
            _this.vModel.breakfastOrderCount = data;
        });
    };
    SignupSinginComponent.prototype.getLunchOrderCount = function (vendorId, menuType) {
        var _this = this;
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe(function (data) {
            _this.vModel.lunchOrderCount = data;
        });
    };
    SignupSinginComponent.prototype.getSnacksOrderCount = function (vendorId, menuType) {
        var _this = this;
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe(function (data) {
            _this.vModel.snacksOrderCount = data;
        });
    };
    SignupSinginComponent.prototype.getDinnerOrderCount = function (vendorId, menuType) {
        var _this = this;
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe(function (data) {
            _this.vModel.dinnerOrderCount = data;
        });
    };
    SignupSinginComponent.prototype.updateOrderStatus = function (orderId, vendorId, menuType) {
        var _this = this;
        this._orderService.updateOrderStatus(orderId, vendorId, menuType).subscribe(function (data) {
            if (menuType === 1)
                _this.vModel.breakfastOrderCount = data;
            else if (menuType === 2)
                _this.vModel.lunchOrderCount = data;
            else if (menuType === 3)
                _this.vModel.snacksOrderCount = data;
            else if (menuType === 4)
                _this.vModel.dinnerOrderCount = data;
            var itemIndex = -1;
            _this.vModel.orderStatus.some(function (data, i) {
                return data.order.id === orderId ? (itemIndex = i, true) : false;
            });
            _this.vModel.orderStatus[itemIndex].ConfirmedReady = true;
        });
    };
    SignupSinginComponent.prototype.printOrder = function (orderId, vendorId) {
        var _this = this;
        this._orderService.acceptOrder(orderId, vendorId).subscribe(function (data) {
            var acceptedOrder = _this.vModel.orderStatus.filter(function (data) {
                return data.order.id === orderId;
            });
            var itemIndex = -1;
            _this.vModel.orderStatus.some(function (data, i) {
                return data.order.id === orderId ? (itemIndex = i, true) : false;
            });
            _this.vModel.acceptedOrder = acceptedOrder[0];
            if (data) {
                //setTimeout(function () {
                _this.vModel.orderStatus[itemIndex].order.accepted = true;
                window.print();
                //}, 1000);
            }
        });
    };
    SignupSinginComponent.prototype.ngOnInit = function () {
        this.vendorId = this.route.snapshot.queryParams["vendorId"];
        this.getBreakfastOrderCount(this.vendorId, 1);
        this.getLunchOrderCount(this.vendorId, 2);
        this.getSnacksOrderCount(this.vendorId, 3);
        this.getDinnerOrderCount(this.vendorId, 4);
        this.loadOrders(this.vendorId, 1);
    };
    return SignupSinginComponent;
}());
SignupSinginComponent = __decorate([
    core_1.Component({
        templateUrl: 'SignupSinginComponent.html'
    }),
    __metadata("design:paramtypes", [order_service_1.OrderService, httpHelper_1.httpHelper,
        router_1.ActivatedRoute])
], SignupSinginComponent);
exports.SignupSinginComponent = SignupSinginComponent;
//# sourceMappingURL=orderStatus.component.js.map