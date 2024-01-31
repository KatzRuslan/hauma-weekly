import { __decorate } from "tslib";
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MainHeaderComponent } from "./shared/components/main-header/main-header.component";
import { ProgressSpinnerService } from "./shared/services/progress-spinner.service";
let AppComponent = class AppComponent {
    constructor() {
        this._spinnerService = inject(ProgressSpinnerService);
        this.spinerActive$ = this._spinnerService.isActive$;
    }
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        standalone: true,
        imports: [CommonModule, RouterOutlet, ConfirmDialogModule, ProgressSpinnerModule, MainHeaderComponent],
        templateUrl: './app.component.html',
        styleUrl: './app.component.scss',
        host: { class: 'flex flex-column overflow-hidden w-full h-full w-screen' }
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map