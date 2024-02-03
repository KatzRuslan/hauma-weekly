import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-side-menu',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './side-menu.component.html',
    styleUrl: './side-menu.component.scss',
    host: { class: 'settings-menu' }
})
export class SideMenuComponent {
    public navigations = [
        {
            name: 'Authors',
            routerLink: ['authors']
        },
        // {
        //     name: 'Categories',
        //     routerLink: ['categories']
        // },
        // {
        //     name: 'Sources',
        //     routerLink: ['sources']
        // },
        // {
        //     name: 'Types',
        //     routerLink: ['types']
        // },
        // {
        //     name: 'Import Data from Excel',
        //     routerLink: ['excel-uploader']
        // }
    ];
}
