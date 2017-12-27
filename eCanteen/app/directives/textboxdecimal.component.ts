import { Component } from '@angular/core';

@Component({
    selector: "textbox-decimal.html",
    templateUrl: "textbox-decimal.html",
})
export class TextboxDecimalComponent {
    ngValue: string;
    placeholder: string;
    maximumLenght: number;
    ngId: string;
    ngName: string;
    fieldRequired: boolean;
    keyup: Function;
}
