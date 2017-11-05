import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IVendor } from '../Types/IVendor';
import { IVendorService } from '../Types/IVendorService';

@Injectable()
export class VendorService implements IVendorService {

    private _vendorServiceUrl = 'api/products/products.json';

    constructor(private _http: Http) { }

    loginVendor(email: string, password: string): Observable<boolean> {
        return this._http.get(this._vendorServiceUrl)
            .map((response: Response) => <boolean>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    registerVendor(vendor: IVendor): Observable<IVendor> {
        return this._http.post(this._vendorServiceUrl, vendor)
            .map((response: Response) => <IVendor>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllVendors(): Observable<IVendor[]> {
        return this._http.get(this._vendorServiceUrl)
            .map((response: Response) => <IVendor[]>response.json())
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

