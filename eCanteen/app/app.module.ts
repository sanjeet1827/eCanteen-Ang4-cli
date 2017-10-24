import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';

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
        FooterComponent
    ],
    bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }