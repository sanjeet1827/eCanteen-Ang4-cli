import { Component, Renderer } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    moduleId: module.id,
    selector: 'app-header',
    templateUrl: "header.component.html",
})

export class HeaderComponent {
    constructor(title: Title) { }
}