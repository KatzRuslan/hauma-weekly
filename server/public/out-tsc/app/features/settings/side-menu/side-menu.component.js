import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
let SideMenuComponent = class SideMenuComponent {
    constructor() {
        this.navigations = [
            {
                name: 'Authors',
                routerLink: ['authors']
            },
            {
                name: 'Categories',
                routerLink: ['categories']
            },
            {
                name: 'Types',
                routerLink: ['types']
            }
        ];
    }
};
SideMenuComponent = __decorate([
    Component({
        selector: 'app-side-menu',
        standalone: true,
        imports: [RouterLink, RouterLinkActive],
        templateUrl: './side-menu.component.html',
        styleUrl: './side-menu.component.scss',
        host: { class: 'settings-menu' }
    })
], SideMenuComponent);
export { SideMenuComponent };
//# sourceMappingURL=side-menu.component.js.map