import { Component, Renderer } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-footer',
    templateUrl: "footer.component.html",
})

export class FooterComponent {
    constructor(title: Title) { }
}