import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Workbook } from "exceljs";
import dayjs from 'dayjs';
import { Observable } from 'rxjs';
let UtilsService = class UtilsService {
    parseTileLink(link, articleTypes, sources) {
        const parsed = {
            articleTypeId: '',
            sourceId: ''
        };
        const [origin] = `${link}`.toLowerCase().replace('https://twitter.com', 'https://x.com').replace('://', '∇').split('/').map(str => str.replace('∇', '://'));
        const source = sources.find(({ provide }) => provide === origin);
        parsed.sourceId = `${source?.id ?? ''}`;
        const articleTypeSelector = ['youtube', 'instagram'].includes(source?.selector ?? '') ? 'video' : 'post';
        parsed.articleTypeId = articleTypes.find(({ selector }) => selector === articleTypeSelector)?.id ?? '';
        return parsed;
    }
    parseAuthorLink(link) {
        const [domain, candidate] = `${link}`
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace('@', '')
            .replace('#', '').split('/');
        let name = `${candidate ?? ''}`
            .replace(/[A-Z]/g, (char) => ` ${char}`)
            .replace(/\_/g, ' ')
            .replace(/\./g, ' ')
            .split(' ')
            .filter(str => !!str && str.length)
            .map((str) => str.length > 3 ? `${str.charAt(0).toUpperCase()}${str.slice(1)}`.trim() : str)
            .join(' ')
            .replace(/\s\s/g, ' ');
        if (!name.length) {
            [name] = (domain ?? '').replace('@', '').split('.');
            name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
        }
        return name;
    }
    async _createArticlesExcel(articles) {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('Hauma Weekly Report');
        worksheet.columns = [
            { header: 'Date', key: 'date', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Type', key: 'articleType', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Featured', key: 'featured', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Category', key: 'category', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Source', key: 'source', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Author', key: 'author', width: 26, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Author Link', key: 'authorLink', width: 36, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Title', key: 'title', width: 40, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Post Link', key: 'link', width: 40, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Subject', key: 'subject', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
            { header: 'Issue Date', key: 'edition', width: 16, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } }, },
            { header: 'Tags', key: 'tags', width: 40, style: { font: { name: 'Roboto', family: 4, size: 11, bold: true } } },
        ];
        articles.forEach((article) => {
            const row = worksheet.addRow({
                date: dayjs(article.date).format('DD-MMM-YYYY'),
                articleType: article.articleTypeName,
                featured: article.featured,
                category: article.categoryName,
                source: article.sourceName,
                author: article.authorName,
                authorLink: article.authorLink,
                title: article.title,
                link: article.link,
                subject: article.subject,
                edition: article.edition ? dayjs(article.edition).format('DD-MMM-YYYY') : '',
                tags: article.tags.join(', ')
            });
            row.font = { name: 'Roboto', family: 4, size: 11 };
            row.commit();
        });
        const excelData = await workbook.xlsx.writeBuffer();
        return excelData;
    }
    async downloadArticles(articles) {
        const excelData = await this._createArticlesExcel(articles);
        const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const a = document.createElement('a');
        const blobUrl = window.URL.createObjectURL(blob);
        a.href = window.URL.createObjectURL(blob);
        a.download = `hauma-weekly.${dayjs().format('DD-MMM-YYYY')}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
    }
    getArticlesFromExcel(file) {
        // const arrayBuffer = await new FileReader().readAsArrayBuffer(file);
        // console.log(arrayBuffer);
        console.log(file.arrayBuffer());
        const articles = [];
        const workbook = new Workbook();
        return new Observable((subscriber) => {
            file.arrayBuffer().then(async (buffer) => {
                await workbook.xlsx.load(buffer);
                const [worksheets] = workbook.worksheets;
                const columns = worksheets.columns;
                const rows = worksheets.getRows(1, 1);
                console.log(worksheets);
                console.log(columns);
                console.log(rows);
                console.log();
                console.log();
                console.log('++++++++++++++++++++++++');
                subscriber.next(articles);
                subscriber.complete();
            });
        });
    }
};
UtilsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UtilsService);
export { UtilsService };
//# sourceMappingURL=utils.service.js.map