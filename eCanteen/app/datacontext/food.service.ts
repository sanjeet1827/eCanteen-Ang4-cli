import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IFood } from '../Types/IFood';
import { IVendorMenu } from '../Types/IVendorMenu';

@Injectable()
export class FoodService {

    private _foodServiceUrl = 'api/products/products.json';

    constructor(private _http: HttpClient) { }

    getFoodItems(vendorId: string, menuType: number): Observable<IFood[]>{

        return this._http.get(this._foodServiceUrl)
            .map((response: HttpResponse<IFood[]>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getMenuFoodItems(vendorId: string, menuType: number, customer: boolean): Observable<IFood[]> {
        return this._http.get(this._foodServiceUrl)
            .map((response: HttpResponse<IFood[]>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getAllFoodItem(vendorId: string): Observable<IFood[]> {
        return this._http.get(this._foodServiceUrl)
            .map((response: HttpResponse<IFood[]>) => response)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveVendorCurrentMenu(vendorMenu: IVendorMenu[], vendorId: string): Observable<void> {

        return this._http.post(this._foodServiceUrl, vendorMenu)
            .map((response: HttpResponse<void>) => response)
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