import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class NotificationService {

    private _notificationServiceUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    getNewOrders(vendorId: string): Observable<number[]> {

        return this._http.get(this._notificationServiceUrl)
            .map((response: Response) => <number[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getCustomerLatestReadyOrder(orderId: string, customerId: string): Observable<number> {

        return this._http.get(this._notificationServiceUrl)
            .map((response: Response) => <number>response.json())
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