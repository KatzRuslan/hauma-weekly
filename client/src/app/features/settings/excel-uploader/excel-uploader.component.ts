import { Component } from '@angular/core';

@Component({
    selector: 'app-excel-uploader',
    standalone: true,
    imports: [],
    templateUrl: './excel-uploader.component.html',
    styleUrl: './excel-uploader.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class ExcelUploaderComponent {
}
