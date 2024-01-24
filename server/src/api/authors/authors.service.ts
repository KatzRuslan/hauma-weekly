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
}
