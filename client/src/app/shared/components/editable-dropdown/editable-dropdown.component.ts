import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TooltipDirective } from '@shared/directives/tooltip.directive';

@Component({
    selector: 'app-editable-dropdown',
    standalone: true,
    imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, TooltipModule, TooltipDirective],
    templateUrl: './editable-dropdown.component.html',
    styleUrl: './editable-dropdown.component.scss'
})
export class EditableDropdownComponent {
    @Input() value!: string;
    @Input() displayValue!: string;
    @Input() options!: any[];
    @Input() optionValue = 'id';
    @Input() optionLabel = 'name';
    @Input() mode!: boolean;
    @Input() placeholder = 'Select Date';
    @Input() link?: string;
    @Input() styleClass?: string;
    @Input() textStyleClass?: string;
    @Input() inputStyleClass?: string;
    @Input() buttonStyleClass = 'table-icon-button';
    @Output() onValueChange = new EventEmitter<string>();
    @Output() onModeChange = new EventEmitter<boolean>();
    public dropdownValue!:string;
    changeValue() {
        this.onValueChange.emit(this.value);
    }
    changeMode(mode: boolean) {
        this.dropdownValue = `${this.value}`;
        this.onModeChange.emit(mode);
    }
}
