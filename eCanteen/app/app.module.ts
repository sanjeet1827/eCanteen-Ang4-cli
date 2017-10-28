import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';

// directives
import { ButtonComponent } from './directives/button.component';
import { TextboxDecimalComponent } from './directives/textboxdecimal.component';
import { TextboxGeneralComponent } from './directives/textboxgeneral.component';

import { CustomerService } from './datacontext/customer.service';
import { FoodService } from './datacontext/food.service';
import { NotificationService } from './datacontext/notification.service';
import { OrderService } from './datacontext/order.service';
import { PayService } from './datacontext/pay.service';
import { SiteService } from './datacontext/site.service';
import { VendorService } from './datacontext/vendor.service';

/* Feature Modules */
//import { ProductModule } from './products/product.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: 'home', /*component: HomeComponent*/ },
            { path: '', redirectTo: 'welcome', pathMatch: 'full' },
            { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
        ])
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        ButtonComponent,
        TextboxDecimalComponent,
        TextboxGeneralComponent
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
export class AppModule { }