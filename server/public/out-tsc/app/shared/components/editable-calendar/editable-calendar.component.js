import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
let EditableCalendarComponent = class EditableCalendarComponent {
    constructor() {
        this.placeholder = 'Select Date';
        this.buttonStyleClass = 'table-icon-button';
        this.onValueChange = new EventEmitter();
        this.onModeChange = new EventEmitter();
    }
    set _value(value) {
        this.value = value ? new Date(value) : null;
    }
    ;
    changeValue() {
        this.onValueChange.emit(this.calendarValue);
    }
    changeMode(mode) {
        if (mode) {
            this.calendarValue = this.value;
        }
        else {
            this.calendarValue = null;
        }
        this.onModeChange.emit(mode);
    }
};
__decorate([
    Input('value')
], EditableCalendarComponent.prototype, "_value", null);
__decorate([
    Input()
], EditableCalendarComponent.prototype, "mode", void 0);
__decorate([
    Input()
], EditableCalendarComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], EditableCalendarComponent.prototype, "styleClass", void 0);
__decorate([
    Input()
], EditableCalendarComponent.prototype, "textStyleClass", void 0);
__decorate([
    Input()
], EditableCalendarComponent.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], EditableCalendarComponent.prototype, "buttonStyleClass", void 0);
__decorate([
    Output()
], EditableCalendarComponent.prototype, "onValueChange", void 0);
__decorate([
    Output()
], EditableCalendarComponent.prototype, "onModeChange", void 0);
EditableCalendarComponent = __decorate([
    Component({
        selector: 'app-editable-calendar',
        standalone: true,
        imports: [CommonModule, FormsModule, CalendarModule, ButtonModule],
        templateUrl: './editable-calendar.component.html',
        styleUrl: './editable-calendar.component.scss'
    })
], EditableCalendarComponent);
export { EditableCalendarComponent };
//# sourceMappingURL=editable-calendar.component.js.map