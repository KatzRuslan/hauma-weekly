import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MainHeaderComponent } from '@shared/components/main-header/main-header.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ConfirmDialogModule, MainHeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    host: { class: 'flex flex-column overflow-hidden w-full h-full w-screen' }
})
export class AppComponent {
}
