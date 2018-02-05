import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class httpHelper {

    constructor(private _router: Router)
    {

    }

    redirectTo(url: string, params?: any): Promise<boolean> {
        return params ? this._router.navigate([url, params]) : this._router.navigateByUrl(url);
    }
}

