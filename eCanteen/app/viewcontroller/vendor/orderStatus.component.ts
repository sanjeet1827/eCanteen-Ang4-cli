import { Component, OnInit } from '@angular/core';

import { OrderService } from '../../datacontext/order.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { OrderStatus } from '../../Models/AppModels';
import { IOrderStatus } from '../../Types/IOrderStatus';

@Component({
    templateUrl: 'SignupSinginComponent.html'
})
export class SignupSinginComponent implements OnInit {
    displayVendorSlider: boolean;
    popUpNotification: boolean;

    menuFor = 1;
    vModel: IOrderStatus[];
    //vModel.orderData = [];

    acceptedOrder: IOrderStatus;
    orderAccepetd: boolean;

    constructor(private _orderService: OrderService, private _httpHelper: httpHelper) {

        this.vModel = new Array<IOrderStatus>();
        this.displayVendorSlider = false;
        this.popUpNotification = false;
        this.acceptedOrder = new OrderStatus();
        this.orderAccepetd = false;
    }

    loadOrders(vendorId, menuType): void {
        this._orderService.getVendorOrders(vendorId, menuType).subscribe(
            (ordersStatus: Array<IOrderStatus>) => {
                this.vModel = ordersStatus;
            }
        );
    }

    ngOnInit(): void {
        
    }

}