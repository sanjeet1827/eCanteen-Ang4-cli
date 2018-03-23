var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { SignupSinginComponent } from './viewcontroller/vendor/signupSignin.component';
import { ReactiveSignupSigninComponent } from './viewcontroller/vendor/ReactiveSignupSignin.component';
import { SinginComponent } from './viewcontroller/vendor/Signin.component';
import { OrderStatusComponent } from './viewcontroller/vendor/orderStatus.component';
// directives
import { ButtonComponent } from './directives/button.component';
import { TextboxDecimalComponent } from './directives/textboxdecimal.component';
import { TextboxGeneralComponent } from './directives/textboxgeneral.component';
import { DecimalInputDirective } from './directives/decimal-input.directive';
//services
import { CustomerService } from './datacontext/customer.service';
import { FoodService } from './datacontext/food.service';
import { NotificationService } from './datacontext/notification.service';
import { OrderService } from './datacontext/order.service';
import { PayService } from './datacontext/pay.service';
import { SiteService } from './datacontext/site.service';
import { VendorService } from './datacontext/vendor.service';
import { httpHelper } from './Helpers/httpHelper';
import { AddHttpHeaderInterceptor } from './common/services/HttpInterceptor';
/* Feature Modules */
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            // HttpModule,
            HttpClientModule,
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            RouterModule.forRoot([
                //{ path: 'home', /*component: HomeComponent*/ },
                { path: '', component: SignupSinginComponent, pathMatch: 'full' },
                { path: 'register', component: ReactiveSignupSigninComponent, pathMatch: 'full' },
                { path: 'orderStatus', component: OrderStatusComponent },
            ])
        ],
        declarations: [
            AppComponent,
            HeaderComponent,
            FooterComponent,
            ButtonComponent,
            TextboxDecimalComponent,
            TextboxGeneralComponent,
            DecimalInputDirective,
            SignupSinginComponent,
            ReactiveSignupSigninComponent,
            SinginComponent,
            OrderStatusComponent
        ],
        exports: [
            TextboxGeneralComponent,
        ],
        providers: [
            CustomerService,
            FoodService,
            NotificationService,
            OrderService,
            PayService,
            SiteService,
            VendorService,
            httpHelper,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: AddHttpHeaderInterceptor,
                multi: true,
            }
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map