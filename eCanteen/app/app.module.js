var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';
// directives
import { ButtonComponent } from './directives/button.component';
import { TextboxDecimalComponent } from './directives/textboxdecimal.component';
import { CustomerService } from './datacontext/customer.service';
import { FoodService } from './datacontext/food.service';
import { NotificationService } from './datacontext/notification.service';
import { OrderService } from './datacontext/order.service';
import { PayService } from './datacontext/pay.service';
import { SiteService } from './datacontext/site.service';
import { VendorService } from './datacontext/vendor.service';
/* Feature Modules */
//import { ProductModule } from './products/product.module';
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
        imports: [
            BrowserModule,
            HttpModule,
            BrowserAnimationsModule,
            RouterModule.forRoot([
                { path: 'home', },
                { path: '', redirectTo: 'welcome', pathMatch: 'full' },
                { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
            ])
        ],
        declarations: [
            AppComponent,
            HeaderComponent,
            FooterComponent,
            ButtonComponent,
            TextboxDecimalComponent
        ],
        providers: [
            CustomerService,
            FoodService,
            NotificationService,
            OrderService,
            PayService,
            SiteService,
            VendorService
        ],
        bootstrap: [AppComponent, HeaderComponent, FooterComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map