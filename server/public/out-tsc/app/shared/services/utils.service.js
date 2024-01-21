import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UtilsService = class UtilsService {
    parseTileLink(link, articleTypes, sources) {
        const parsed = {
            articleTypeId: '',
            sourceId: ''
        };
        const [origin] = `${link}`.toLowerCase().replace('://', '∇').split('/').map(str => str.replace('∇', '://'));
        const source = sources.find(({ provide }) => provide === origin);
        if (source) {
            parsed.sourceId = `${source.id}`;
            const provides = articleTypes.map((articleType) => {
                const index = articleType.provides.findIndex((provide) => provide === source.selector);
                if (index < 0) {
                    return undefined;
                }
                return {
                    id: articleType.id,
                    index
                };
            }).filter(node => !!node).sort((a, b) => (a?.index ?? 0) - (b?.index ?? 0));
            if (provides[0]?.id) {
                parsed.articleTypeId = provides[0].id;
            }
        }
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
};
UtilsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UtilsService);
export { UtilsService };
//# sourceMappingURL=utils.service.js.map