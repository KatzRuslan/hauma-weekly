import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { IAuthor } from '../api.interfaces';

@Injectable()
export class AuthorsService {
    constructor(private _appService: AppService) {}
    async getAuthors() {
        return await this._appService.get('authors');
    }
    async addAuthor(author: IAuthor) {
        author.id = this._appService.generateUUID('XXXY-aYXXX-XXXXX');
        await this._appService.post(author, 'authors', 'link');
        return author;
    }
    async updateAuthor(id: string, author: IAuthor) {
        await this._appService.put(author, 'authors', id, 'link');
        return author;
    }
    async removeAuthor(id: string) {
        await this._appService.delete('authors', id);
        return { ok: true };
    }
}
