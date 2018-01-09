import { Component } from '@angular/core';

@Component({
    selector: 'app',
    //template: `
    // <app-header></app-header>
    //    <router-outlet></router-outlet>
    //    <app-footer></app-footer>
    // `
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
    pageTitle: string = 'eCanteen';
}
