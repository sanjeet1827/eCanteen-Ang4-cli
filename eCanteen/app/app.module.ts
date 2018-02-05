import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
//import { HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
import { SignupSinginComponent } from './viewcontroller/vendor/signupSignin.component';
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


@NgModule({
    imports: [
        BrowserModule,
       // HttpModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        
        RouterModule.forRoot([
            //{ path: 'home', /*component: HomeComponent*/ },
            { path: '', component: SignupSinginComponent, pathMatch: 'full' },
            { path: 'orderStatus', component: OrderStatusComponent },
            //{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
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
export class AppModule { }