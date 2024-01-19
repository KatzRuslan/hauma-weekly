import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-editable-calendar',
    standalone: true,
    imports: [CommonModule, FormsModule, CalendarModule, ButtonModule],
    templateUrl: './editable-calendar.component.html',
    styleUrl: './editable-calendar.component.scss'
})
export class EditableCalendarComponent {
    @Input('value') set _value(value: string) {
        this.value = value ? new Date(value) : null;
    };
    @Input() mode!: boolean;
    @Input() placeholder = 'Select Date';
    @Input() styleClass?: string;
    @Input() textStyleClass?: string;
    @Input() inputStyleClass?: string;
    @Input() buttonStyleClass = 'table-icon-button';
    @Output() onValueChange = new EventEmitter<string>();
    @Output() onModeChange = new EventEmitter<boolean>();
    public value!: any;
    public calendarValue!:any;
    changeValue() {
        this.onValueChange.emit(this.calendarValue);
    }
    changeMode(mode: boolean) {
        if (mode) {
            this.calendarValue = this.value;
        } else {
            this.calendarValue = null;
        }
        this.onModeChange.emit(mode);
    }
}
