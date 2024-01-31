import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TooltipDirective } from "../../directives/tooltip.directive";
let EditableTextComponent = class EditableTextComponent {
    constructor() {
        this.buttonStyleClass = 'table-icon-button';
        this.tooltipPosition = 'top';
        this.onValueChange = new EventEmitter();
        this.onModeChange = new EventEmitter();
    }
    onKeyDown({ key }) {
        if (this.mode && key.toLowerCase() === 'escape') {
            this.changeMode(false);
        }
    }
    changeValue() {
        this.onValueChange.emit(this.inputValue);
    }
    changeMode(mode) {
        this.inputValue = `${this.value}`;
        this.onModeChange.emit(mode);
    }
};
__decorate([
    HostListener('document:keydown', ['$event'])
], EditableTextComponent.prototype, "onKeyDown", null);
__decorate([
    Input()
], EditableTextComponent.prototype, "value", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "mode", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "link", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "styleClass", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "textStyleClass", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "inputStyleClass", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "buttonStyleClass", void 0);
__decorate([
    Input()
], EditableTextComponent.prototype, "tooltipPosition", void 0);
__decorate([
    Output()
], EditableTextComponent.prototype, "onValueChange", void 0);
__decorate([
    Output()
], EditableTextComponent.prototype, "onModeChange", void 0);
EditableTextComponent = __decorate([
    Component({
        selector: 'app-editable-text',
        standalone: true,
        imports: [CommonModule, FormsModule, InputTextModule, ButtonModule, TooltipModule, TooltipDirective],
        templateUrl: './editable-text.component.html',
        styleUrl: './editable-text.component.scss'
    })
], EditableTextComponent);
export { EditableTextComponent };
//# sourceMappingURL=editable-text.component.js.map