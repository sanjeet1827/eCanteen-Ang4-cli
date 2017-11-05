import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[fileupload-general]'
})
export class FileuploadDirective {

    constructor(private el: ElementRef) { }

    @HostListener('change') onChange() {
        this.readFile();
    }

    private readFile() {
        //var model = $parse(attrs.fileuploadGeneral);
        //var modelSetter = model.assign;
    }
}