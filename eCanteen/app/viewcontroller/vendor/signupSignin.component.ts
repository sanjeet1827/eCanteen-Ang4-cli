import { Component, OnInit } from '@angular/core';

import { SiteService } from '../../datacontext/site.service';
import { VendorService } from '../../datacontext/vendor.service';
import { httpHelper } from '../../Helpers/httpHelper';

import { ISite } from '../../Types/ISite'
import { ISiteService } from '../../Types/ISiteService'
import { IVendorService } from '../../Types/IVendorService'
import { IVendor } from '../../Types/IVendor'

import { SignIn, SignUp, Vendor } from '../../Models/AppModels'

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
        this.vLoginModel.authenticated = true;
    }

    activeLoginView(active: boolean): boolean {
        return this.vModel.showLoginView = active;
    }

    signIn(isVendorLoginFormValid: boolean): void {
        if (isVendorLoginFormValid) {
            let vModel: IVendor = new Vendor();
            vModel.email = this.vLoginModel.email;
            vModel.password = this.vLoginModel.password;

            this._vendorService.loginVendor(vModel).subscribe(
                (authenticatedVendor: IVendor) => {
                    if (authenticatedVendor) {
                        //$rootScope.vendorUId = authenticatedVendor.id;
                        //$rootScope.vendorName = authenticatedVendor.name;
                        //$document[0].body.className = '';

                        this._httpHelper.redirectTo("/orderStatus", { vendorId: authenticatedVendor.id });
                    }
                    else {
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

    signUp(IsSiteFormVvalid: boolean): void {
        console.log("signUp ethod invoked");
        if (IsSiteFormVvalid) {

            let vModel: IVendor = new Vendor();
            vModel.name = this.vModel.name;
            vModel.active = true;
            vModel.email = this.vModel.email;
            vModel.logo = this.vModel.logo;
            vModel.password = this.vModel.password;
            vModel.shopNo = this.vModel.shopNo;
            vModel.siteId = this.vModel.selectedSite;
            vModel.contact = this.vModel.contactNo;

            this._vendorService.registerVendor(vModel).subscribe((registeredVendor: boolean) => {
                if (registeredVendor !== undefined && registeredVendor) {
                    this.vModel.alreadyRegistered = false;
                    this.vModel.registerationPosted = true;
                }
                else {
                    this.vModel.alreadyRegistered = true;
                }
            })

        }
    }

    ngOnInit(): void {
        this._siteService.getSites()
            .subscribe((sites) => {
                this.sites = sites;
                this.vModel.selectedSite = sites.filter((st) => {
                    return st.Name === "Ansal Tower";
                })[0].Id.toString();
            },
            error => this.errorMessage = <any>error);
    }
}