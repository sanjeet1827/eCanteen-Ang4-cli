import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IOrder } from '../Types/IOrder';
import { IOrderDetail } from '../Types/IOrderDetail';

@Injectable()
export class OrderService {

    private _orderServiceUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    placeOrder(order: IOrder): Observable<IOrder> {

        return this._http.post(this._orderServiceUrl, order)
            .map((response: Response) => <IOrder>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getConfirmedOrderDetail(orderId: string): Observable<IOrderDetail> {

        return this._http.get(this._orderServiceUrl)
            .map((response: Response) => <IOrder>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getVendorOrders(vendorId: string, menuType: number): Observable<string> {

        return this._http.get(this._orderServiceUrl)
            .map((response: Response) => <string>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMenuWiseStatusCount(vendorId: string, menuType: number, tp: boolean): Observable<string> {

        return this._http.get(this._orderServiceUrl)
            .map((response: Response) => <string>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateOrderStatus(orderId: string,vendorId: string, menuType: number): Observable<string> {

        return this._http.get(this._orderServiceUrl)
            .map((response: Response) => <string>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    acceptOrder(orderId: string, vendorId: string): Observable<boolean> {

        return this._http.get(this._orderServiceUrl)
            .map((response: Response) => <boolean>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCustomerOrderHistory(customerId: string, customerDetail: boolean): Observable<IOrderDetail[]> {

        return this._http.get(this._orderServiceUrl)
            .map((response: Response) => <IOrderDetail[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}