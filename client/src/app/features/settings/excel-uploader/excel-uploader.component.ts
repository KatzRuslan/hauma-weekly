import { Component, inject } from '@angular/core';
import  { Workbook } from 'exceljs';
import dayjs from 'dayjs';

@Component({
    selector: 'app-excel-uploader',
    standalone: true,
    imports: [],
    templateUrl: './excel-uploader.component.html',
    styleUrl: './excel-uploader.component.scss',
    host: { class: 'flex flex-column overflow-hidden h-full settings-page' }
})
export class ExcelUploaderComponent {
    async fileLoad(files: FileList | null) {
        if (!(files && files.length)) {
            return;
        }
        const names = ['', 'date', 'articleType', 'featured', 'category', 'source', 'author', 'authorLink', 'title', 'subject', '', 'link', 'edition', 'tags'];
        const articles: any[] = [];
        let isHeader = true;
        const fileReader = new FileReader();
        fileReader.onload = async ({target}) => {
            const workbook = new Workbook();
            if (target?.result) {
                await workbook.xlsx.load(target.result as any);
                workbook.worksheets[0].eachRow((row) => {
                    if (isHeader) {
                        isHeader = false;
                    } else {
                        const rowData: {[key: string]: any} = {};
                        row.eachCell((cell, cellIndex) => {
                            if (names[cellIndex]) {
                                const key = names[cellIndex];
                                let value = cell.text;
                                // if (['date', 'edition'].includes(key)) {
                                //     value = dayjs(`${value}`).format('DD-MMM-YYYY');
                                // }
                                if (key === 'date') {
                                    value = dayjs(`${value}`).format('DD-MMM-YYYY');
                                } else if (key === 'edition') {
                                    value = '';
                                }
                                rowData[key] = value;
                            }
                        });
                        articles.push(rowData);
                    }
                });
            }
            console.log(articles);
        };
        fileReader.readAsArrayBuffer(files[0]);
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
        console.log();
    }
    constructor() {
        // console.log();
        // console.log();
        // console.log();
        // console.log();
        
    }
}
