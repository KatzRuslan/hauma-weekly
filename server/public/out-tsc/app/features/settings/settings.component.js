import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from './side-menu/side-menu.component';
let SettingsComponent = class SettingsComponent {
};
SettingsComponent = __decorate([
    Component({
        selector: 'app-settings',
        standalone: true,
        imports: [RouterOutlet, SideMenuComponent],
        templateUrl: './settings.component.html',
        styleUrl: './settings.component.scss',
        host: { class: 'flex overflow-hidden w-full h-full w-screen' }
    })
], SettingsComponent);
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map