import { Component } from '@angular/core';

@Component({
    selector: "textbox-general",
    templateUrl: "textbox-general.html",
})
export class TextboxGeneralComponent {
    ngType: string;
    ngValue: string;
    placeholder: string;
    maximumLenght: number;
    minimumLenght: number;
    ngId: string;
    ngName: string;
    fieldRequired: boolean;
    keyup: Function;

    constructor() {
        this.ngType = "text";
    }
}
