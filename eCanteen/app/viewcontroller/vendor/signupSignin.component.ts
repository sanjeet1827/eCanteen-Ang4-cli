import { Component, OnInit } from '@angular/core';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';

import { ISite } from '../../Types/ISite'
import { ISiteService } from '../../Types/ISiteService'
import { IVendorService } from '../../Types/IVendorService'

@Component({
    templateUrl: 'signupSignin.tpl.html'
    
})
export class SignupSinginComponent implements OnInit {

    constructor(private _siteService: ISiteService,
        private _vendorService: IVendorService) {

    }

    ngOnInit(): void {
        //this._productService.getProducts()
        //    .subscribe(products => this.products = products,
        //    error => this.errorMessage = <any>error);
    }

}