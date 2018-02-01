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
var order_service_1 = require("../../datacontext/order.service");
var httpHelper_1 = require("../../Helpers/httpHelper");
var AppModels_1 = require("../../Models/AppModels");
var SignupSinginComponent = (function () {
    function SignupSinginComponent(_orderService, _httpHelper) {
        this._orderService = _orderService;
        this._httpHelper = _httpHelper;
        this.menuFor = 1;
        this.vModel = new Array();
        this.displayVendorSlider = false;
        this.popUpNotification = false;
        this.acceptedOrder = new AppModels_1.OrderStatus();
        this.orderAccepetd = false;
    }
    SignupSinginComponent.prototype.loadOrders = function (vendorId, menuType) {
        var _this = this;
        this._orderService.getVendorOrders(vendorId, menuType).subscribe(function (ordersStatus) {
            _this.vModel = ordersStatus;
        });
    };
    SignupSinginComponent.prototype.ngOnInit = function () {
    };
    return SignupSinginComponent;
}());
SignupSinginComponent = __decorate([
    core_1.Component({
        templateUrl: 'SignupSinginComponent.html'
    }),
    __metadata("design:paramtypes", [order_service_1.OrderService, httpHelper_1.httpHelper])
], SignupSinginComponent);
exports.SignupSinginComponent = SignupSinginComponent;
//# sourceMappingURL=orderStatus.component.js.map