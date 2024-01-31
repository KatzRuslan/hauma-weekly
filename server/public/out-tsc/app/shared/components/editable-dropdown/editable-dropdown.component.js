import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { TooltipDirective } from "../../directives/tooltip.directive";
let EditableDropdownComponent = class EditableDropdownComponent {
    constructor() {
        this.optionValue = 'id';
        this.optionLabel = 'name';
        this.placeholder = 'Select Date';
        this.buttonStyleClass = 'table-icon-button';
        this.onValueChange = new EventEmitter();
        this.onModeChange = new EventEmitter();
    }
    changeValue() {
        this.onValueChange.emit(this.value);
    }
    changeMode(mode) {
        this.dropdownValue = `${this.value}`;
        this.onModeChange.emit(mode);
    }
};
__decorate([
    Input()
], EditableDropdownComponent.prototype, "value", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "displayValue", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "options", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "optionValue", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "optionLabel", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "mode", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "placeholder", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "link", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "styleClass", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "textStyleClass", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], EditableDropdownComponent.prototype, "buttonStyleClass", void 0);
__decorate([
    Output()
], EditableDropdownComponent.prototype, "onValueChange", void 0);
__decorate([
    Output()
], EditableDropdownComponent.prototype, "onModeChange", void 0);
EditableDropdownComponent = __decorate([
    Component({
        selector: 'app-editable-dropdown',
        standalone: true,
        imports: [CommonModule, FormsModule, DropdownModule, ButtonModule, TooltipModule, TooltipDirective],
        templateUrl: './editable-dropdown.component.html',
        styleUrl: './editable-dropdown.component.scss'
    })
], EditableDropdownComponent);
export { EditableDropdownComponent };
//# sourceMappingURL=editable-dropdown.component.js.map