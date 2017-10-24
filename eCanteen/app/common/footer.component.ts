import { Component, Renderer } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'app-footer',
    templateUrl: "footer.component.html",
})

export class FooterComponent {
    constructor(title: Title) { }
}