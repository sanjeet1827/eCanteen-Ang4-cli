import { Component, Renderer } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-header',
    templateUrl: "header.component.html",
})

export class HeaderComponent {
    constructor(title: Title) { }
}