import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { ICustomer } from '../Types/ICustomer';

@Injectable()
export class CustomerService {

    private _customerServiceUrl = 'api/products/products.json';

    constructor(private _http: HttpClient) { }

    getCustomer(id: string): Observable<ICustomer> {

        return this._http.get(this._customerServiceUrl)
            .map((response: HttpResponse<ICustomer>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    loginCustomer(email: string, password: string): Observable<ICustomer> {

        return this._http.get(this._customerServiceUrl)
            .map((response: HttpResponse<ICustomer>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    registerCustomer(customer: ICustomer): Observable<boolean> {
        return this._http.post(this._customerServiceUrl, customer)
            .map((response: HttpResponse<boolean>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    confirmRegistration(customerId: string, customerDetail: boolean): Observable<ICustomer> {
        return this._http.get(this._customerServiceUrl)
            .map((response: HttpResponse<ICustomer>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.message || 'Server error');
    }
}