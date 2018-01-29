import {
    Component, Input,
    Output, EventEmitter, forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, Validator } from '@angular/forms';

@Component({
    selector: "textbox-general",
    templateUrl: "textbox-general.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextboxGeneralComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TextboxGeneralComponent),
            multi: true,
        }]
})
export class TextboxGeneralComponent implements ControlValueAccessor, Validator {
    @Input() ngType: string;
    @Input() placeholder: string;
    @Input() maximumLenght: number;
    @Input() minimumLenght: number;
    @Input() ngId: string;
    @Input() ngName: string;
    @Input() fieldRequired: boolean;
    keyup: Function;

    private IsRequiredFieldEmpty: boolean=true;
    private data: any;
    private ngValue: string;

    constructor() {
        this.ngType = "text";
    }

    // this is the initial value set to the component
    public writeValue(obj: any) {
        if (obj) {
            this.data = obj;
            // this will format it with 4 character spacing
            this.ngValue = obj;
        }
    }

    // registers 'fn' that will be fired wheb changes are made
    // this is how we emit the changes back to the form
    public registerOnChange(fn: any) {
        this.propagateChange = fn;
    }

    // validates the form, returns null when valid else the validation object
    // in this case we're checking if the json parsing has passed or failed from the onChange method
    public validate(c: FormControl) {
        return (!this.IsRequiredFieldEmpty) ? null : {
            jsonParseError: {
                valid: false,
            },
        };
    }

    // not used, used for touch input
    public registerOnTouched() { }

    // change events from the textarea
    private onChange(event) {

        // get value from text area
        let newValue = event.target.value;

        try {
            // parse it to json
            //this.data = JSON.parse(newValue);
            this.ngValue = newValue;
            let checkValue = this.ngValue.toString().trim();
            this.IsRequiredFieldEmpty = checkValue === undefined || checkValue === null || checkValue === "" ? true : false;
        } catch (ex) {
            // set parse error if it fails
            this.IsRequiredFieldEmpty = true;
        }

        // update the form
        this.propagateChange(this.ngValue);
    }


    //@Output() ngValueChange = new EventEmitter();
    //change(newValue) {
    //    this.ngValue = newValue;
    //    this.ngValueChange.emit(newValue);
    //}

    // the method set in registerOnChange to emit changes back to the form
    private propagateChange = (_: any) => { };

}
