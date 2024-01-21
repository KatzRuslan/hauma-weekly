import { Injectable } from '@angular/core';
import { IArticleType, ISource, ITableArticle } from '@shared/interfaces/features.interfaces';
import  { Workbook } from 'exceljs';
import dayjs from 'dayjs';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    parseTileLink(link: string, articleTypes: IArticleType[], sources: ISource[]) {
        const parsed = {
            articleTypeId: '',
            sourceId: ''
        };
        const [origin] = `${link}`.toLowerCase().replace('://', '∇').split('/').map(str => str.replace('∇', '://'));
        const source = sources.find(({ provide }) => provide === origin);
        parsed.sourceId = `${source?.id ?? ''}`;
        const articleTypeSelector = ['youtube', 'instagram'].includes(source?.selector ?? '') ? 'video' : 'post';
        parsed.articleTypeId = articleTypes.find(({ selector }) => selector === articleTypeSelector)?.id ?? '';
        return parsed;
    }
    parseAuthorLink(link: string) {
        const [domain, candidate] = `${link}`
            .replace('https://', '')
            .replace('http://', '')
            .replace('www.', '')
            .replace('@', '')
            .replace('#', '').split('/');
        let name = `${candidate ?? ''}`
            .replace(/[A-Z]/g, (char: string) => ` ${char}`)
            .replace(/\_/g, ' ')
            .replace(/\./g, ' ')
            .split(' ')
            .filter(str => !!str && str.length)
            .map((str: string) => str.length >  3 ? `${str.charAt(0).toUpperCase()}${str.slice(1)}`.trim() : str)
            .join(' ')
            .replace(/\s\s/g, ' ');
        if (!name.length) {
            [name] = (domain ?? '').replace('@', '').split('.')
            name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`
        }
        return name;
    }
    private async _createArticlesExcel(articles: ITableArticle[]) {
        const workbook = new Workbook()
        const worksheet = workbook.addWorksheet('Hauma Weekly Report');
        const titleRow = worksheet.addRow(['Date', 'Type', 'Featured', 'Category', 'Source', 'Author', 'Author Link', 'Title', 'Post Link', 'Subject',	'Issue Date', 'Tags']);
        titleRow.font = { name: 'Roboto', family: 4, size: 11, bold: true };
        articles.forEach((article) => {
            const row = worksheet.addRow([
                article.date,
                article.articleTypeName,
                article.featured,
                article.categoryName,
                article.sourceName,
                article.authorName,
                article.authorLink,
                article.title,
                article.link,
                article.subject,
                article.edition,
                article.tags.join(', ')
            ]);
            row.font = { name: 'Roboto', family: 4, size: 11 };
        });
        const widths = [16, 16, 16, 16, 16, 16, 26, 36, 40, 40, 16, 40];
        worksheet.columns.forEach((column, index) => column.width = widths.at(index));
        const excelData = await workbook.xlsx.writeBuffer();
        return excelData;
    }
    async downloadArticles(articles: ITableArticle[]) {
        const excelData = await this._createArticlesExcel(articles);
        const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const a = document.createElement('a');
        const blobUrl = window.URL.createObjectURL(blob);
        a.href = window.URL.createObjectURL(blob);
        a.download = `hauma-weekly.${dayjs().format('DD-MMM-YYYY')}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(blobUrl);
    }
}
