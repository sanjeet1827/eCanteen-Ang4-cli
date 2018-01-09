import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: "button-general",
    templateUrl: "button-general.html"
})
export class ButtonComponent {
    @Input() buttonType: string;
    @Input() value: string;
    @Output() Submit = new EventEmitter<void>();

    public TriggerSubmit = (): void => {
        this.Submit.emit();
    }
}
