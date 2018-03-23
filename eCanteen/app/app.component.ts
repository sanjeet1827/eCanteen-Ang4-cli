import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'app',
    //template: `
    // <app-header></app-header>
    //    <router-outlet></router-outlet>
    //    <app-footer></app-footer>
    // `
    template: '<router-outlet></router-outlet>',
    styleUrls: ['../styles.css']
})
export class AppComponent {
    pageTitle: string = 'eCanteen';
}
