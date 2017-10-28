import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IPayment } from '../Types/IPayment';
import { IPayOrder } from '../Types/IPayOrder';

@Injectable()
export class PayService {

    private _paymentServiceUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    payOrder(payOrder: IPayOrder, orderId: string): Observable<IPayOrder>
    {
        return this._http.post(this._paymentServiceUrl, payOrder)
            .map((response: Response) => <IPayOrder>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    updateOrder(payment: IPayment): Observable<IPayment>
    {
        return this._http.post(this._paymentServiceUrl, payment)
            .map((response: Response) => <IPayment>response.json())
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