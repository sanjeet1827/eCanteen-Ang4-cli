import {
    Component, Input,
    Output, EventEmitter
} from '@angular/core';

@Component({
    selector: "textbox-general",
    templateUrl: "textbox-general.html",
})
export class TextboxGeneralComponent {
    @Input() ngType: string;
    @Input() ngValue: string;
    @Input() placeholder: string;
    @Input() maximumLenght: number;
    @Input() minimumLenght: number;
    @Input() ngId: string;
    @Input() ngName: string;
    @Input() fieldRequired: boolean;
    keyup: Function;

    @Output() ngValueChange = new EventEmitter();
    change(newValue) {
        this.ngValue = newValue;
        this.ngValueChange.emit(newValue);
    }

    constructor() {
        this.ngType = "text";
    }
}
