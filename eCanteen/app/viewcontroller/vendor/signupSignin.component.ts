import { Component, OnInit } from '@angular/core';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { ISite } from '../../Types/ISite'
import { ISiteService } from '../../Types/ISiteService'
import { IVendorService } from '../../Types/IVendorService'
import { IVendor } from '../../Types/IVendor'

import { SignIn, SignUp } from '../../Models/AppModels'

@Component({
    templateUrl: 'SignupSinginComponent.html'

})
export class SignupSinginComponent implements OnInit {

    vModel: SignUp;
    vLoginModel: SignIn;
    showLoginView: boolean = true;
    sites: ISite[];
    errorMessage: any;

    constructor(private _siteService: SiteService,
        private _vendorService: VendorService, private _httpHelper: httpHelper) {
        this.vModel = new SignUp();
        this.vLoginModel = new SignIn();
    }

    activeLoginView(active: boolean): boolean {
        return this.vModel.showLoginView = active;
    }

    signIn(vendorLoginForm: boolean, signIn: SignIn): void {
        if (!vendorLoginForm) {
            this._vendorService.loginVendor(signIn.email, signIn.password).subscribe(
                (authenticatedVendor: IVendor) => {
                    if (authenticatedVendor) {
                        //$rootScope.vendorUId = authenticatedVendor.id;
                        //$rootScope.vendorName = authenticatedVendor.name;
                        //$document[0].body.className = '';

                        this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.id});
                    }
                    else
                    {
                        this.vLoginModel.authenticated = false;
                    }
                }
            )

            //    .then(function (data) {
            //    if (data !== undefined && data !== null) {
            //        $rootScope.vendorUId = data.Id;
            //        $rootScope.vendorName = data.Name;
            //        $document[0].body.className = '';

            //        $state.go("shell.orderStatus");
            //    }
            //    else {
            //        $scope.vLoginModel.autheticated = false;
            //    }
            //});
        }
    }

    signUp(siteFormInvalid: boolean, vModel: IVendor): void {
        if (!siteFormInvalid) {

            /*
            let remoteData: IVendor;

            remoteData.id = vModel.id;
            remoteData.name = vModel.name;
            remoteData.email = vModel.email;
            remoteData.contact = vModel.contact;
            remoteData.password = vModel.password;
            remoteData.shopNo = vModel.shopNo;
            remoteData.siteId = vModel.siteId;
            remoteData.logo = vModel.logo;
            */

            if (!siteFormInvalid) {
                this._vendorService.registerVendor(vModel).subscribe((registeredVendor: IVendor) => {
                    if (registeredVendor !== undefined)
                    {
                        this.vModel.alreadyRegistered = false;
                        this.vModel.registerationPosted = true;
                    }
                    else
                    {
                        this.vModel.alreadyRegistered = true;
                    }
                })
            }
        }
    }

    ngOnInit(): void {
        this._siteService.getSites()
            .subscribe(sites => this.sites = sites,
            error => this.errorMessage = <any>error);
    }
}