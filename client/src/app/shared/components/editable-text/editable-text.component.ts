import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
    selector: 'app-editable-text',
    standalone: true,
    imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, TooltipModule, TooltipDirective],
    templateUrl: './editable-text.component.html',
    styleUrl: './editable-text.component.scss'
})
export class EditableTextComponent {
    @HostListener('document:keydown', ['$event']) onKeyDown({ key }: KeyboardEvent ) {
        if (this.mode && key.toLowerCase() === 'escape') {
            this.changeMode(false);
        }
    }
    @Input() value!: string;
    @Input() mode!: boolean;
    @Input() link?: string;
    @Input() styleClass?: string;
    @Input() textStyleClass?: string;
    @Input() inputStyleClass?: string;
    @Input() buttonStyleClass = 'table-icon-button';
    @Input() tooltipPosition = 'top';
    @Output() onValueChange = new EventEmitter<string>();
    @Output() onModeChange = new EventEmitter<boolean>();
    public inputValue!:string;
    changeValue() {
        this.onValueChange.emit(this.inputValue)
    }
    changeMode(mode: boolean) {
        this.inputValue = `${this.value}`;
        this.onModeChange.emit(mode);
    }
}
