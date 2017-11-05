import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[decimal-input]'
})
export class DecimalInputDirective {

    constructor(private el: ElementRef) { }

    @HostListener('input') onInput() {
        this.transformToDecimal(this.el.nativeElement.target.value);
    }

    private transformToDecimal(value: string) {
        var rawValue =value !== undefined && value !== null && value !== '' ? value : '';

        if (/[^0-9.]/g.test(rawValue)) {
            this.el.nativeElement
            if (this.el.nativeElement.target.getAttribute('oldValue') !== undefined &&
                this.el.nativeElement.target.getAttribute('oldValue') !== null) {
                var oldValue = this.el.nativeElement.target.getAttribute('oldValue');
                this.el.nativeElement.target.value = oldValue;
            }
            else {
                this.el.nativeElement.target.value = rawValue.replace(rawValue, "");
            }
        }
        else {
            this.el.nativeElement.target.setAttribute('oldValue', rawValue);
        }
    }
}