import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { OrderService } from '../../datacontext/order.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { OrderStatus, OrderStatusData } from '../../Models/AppModels';
import { IOrderStatus } from '../../Types/IOrderStatus';

@Component({
    templateUrl: 'orderStatus.component.html'
})
export class OrderStatusComponent implements OnInit {

    public vendorId: string;
    public vModel: OrderStatusData;

    constructor(private _orderService: OrderService, private _httpHelper: httpHelper,
        private route: ActivatedRoute) {
        this.vModel = new OrderStatusData();
        this.vModel.orderStatus = new Array<IOrderStatus>();
        this.vModel.displayVendorSlider = false;
        this.vModel.popUpNotification = false;
        this.vModel.acceptedOrder = new OrderStatus();
        this.vModel.orderAccepetd = false;
    }

    loadOrders(vendorId, menuType): void {
        this._orderService.getVendorOrders(vendorId, menuType).subscribe(
            (ordersStatus: Array<IOrderStatus>) => {
                this.vModel.orderStatus = ordersStatus;
                this.loadOrderDetail(this.vModel.orderStatus[0].order.id);
            }
        );
    }

    loadOrderDetail(orderId): void {
        var orderDetail = this.vModel.orderStatus.filter(function (data) {
            return data.order.id === orderId;
        })

        this.vModel.orderDetail = orderDetail[0];
    }

    getBreakfastOrderCount(vendorId, menuType): void {
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe((data: string) => {
            this.vModel.breakfastOrderCount = data;
        })
    }

    getLunchOrderCount(vendorId, menuType): void {
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe((data: string) => {
            this.vModel.lunchOrderCount = data;
        })
    }

    getSnacksOrderCount(vendorId, menuType): void {
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe((data: string) => {
            this.vModel.snacksOrderCount = data;
        })
    }

    getDinnerOrderCount(vendorId, menuType): void {
        this._orderService.getMenuWiseStatusCount(vendorId, menuType).subscribe((data: string) => {
            this.vModel.dinnerOrderCount = data;
        })
    }

    updateOrderStatus(orderId, vendorId, menuType): void {
        this._orderService.updateOrderStatus(orderId, vendorId, menuType).subscribe((data: string) => {
            if (menuType === 1)
                this.vModel.breakfastOrderCount = data;
            else if (menuType === 2)
                this.vModel.lunchOrderCount = data;
            else if (menuType === 3)
                this.vModel.snacksOrderCount = data;
            else if (menuType === 4)
                this.vModel.dinnerOrderCount = data;

            let itemIndex = -1;

            this.vModel.orderStatus.some(function (data, i) {
                return data.order.id === orderId ? (itemIndex = i, true) : false;
            });

            this.vModel.orderStatus[itemIndex].ConfirmedReady = true;
        })
    }

    printOrder(orderId, vendorId): void {
        this._orderService.acceptOrder(orderId, vendorId).subscribe((data: boolean) => {

            let acceptedOrder = this.vModel.orderStatus.filter(function (data) {
                return data.order.id === orderId;
            });

            let itemIndex = -1;

            this.vModel.orderStatus.some(function (data, i) {
                return data.order.id === orderId ? (itemIndex = i, true) : false;
            });

            this.vModel.acceptedOrder = acceptedOrder[0];

            if (data) {
                //setTimeout(function () {
                this.vModel.orderStatus[itemIndex].order.accepted = true;
                window.print();
                //}, 1000);
            }

        });
    }

    ngOnInit(): void {
        
        this.route.params.subscribe(params => {

            this.vendorId = params["vendorId"];
            this.getBreakfastOrderCount(this.vendorId, 1);
            this.getLunchOrderCount(this.vendorId, 2);
            this.getSnacksOrderCount(this.vendorId, 3);
            this.getDinnerOrderCount(this.vendorId, 4);

            //this.loadOrders(this.vendorId, 1);
        });

        
    }
}