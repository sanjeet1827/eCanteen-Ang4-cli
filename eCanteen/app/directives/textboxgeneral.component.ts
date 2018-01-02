import {
    Component, Input,
    Output, EventEmitter
} from '@angular/core';

@Component({
    selector: "textbox-general",
    templateUrl: "textbox-general.html",
})
export class TextboxGeneralComponent {
    ngType: string;
    @Input() ngValue: string;
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
