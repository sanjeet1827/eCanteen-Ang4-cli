import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IVendor } from '../Types/IVendor';
import { IVendorService } from '../Types/IVendorService';

@Injectable()
export class VendorService implements IVendorService {

    private _vendorServiceUrl = 'http://localhost:2434/api/Vendor';

    constructor(private _http: HttpClient) {

    }

    loginVendor(email: string, password: string): Observable<IVendor> {
        return this._http.get(this._vendorServiceUrl)
            .map((response: HttpResponse<IVendor>) => <IVendor>response.body)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    registerVendor(vendor: IVendor): Observable<IVendor> {
        //let headers = new Headers({ 'Content-Type': 'application/json' });
        //let options = new RequestOptions({ headers: headers });
        return this._http.post(this._vendorServiceUrl, JSON.stringify(vendor))
            .map((response: HttpResponse<IVendor>) => <IVendor>response.body)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllVendors(): Observable<IVendor[]> {
        return this._http.get(this._vendorServiceUrl)
            .map((response: HttpResponse<IVendor[]>) => <IVendor[]>response.body)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private handleError(error: HttpResponse<any>) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.body || 'Server error');
    }
}

