import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MainHeaderComponent } from '@shared/components/main-header/main-header.component';
import { ProgressSpinnerService } from '@shared/services/progress-spinner.service';
import { tap } from 'rxjs';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, ConfirmDialogModule, ProgressSpinnerModule, MainHeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    host: { class: 'flex flex-column overflow-hidden w-full h-full w-screen' }
})
export class AppComponent {
    private _spinnerService = inject(ProgressSpinnerService);
    public spinerActive$ = this._spinnerService.isActive$;
}
