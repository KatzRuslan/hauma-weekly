import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { IArticleType } from '../api.interfaces';

@Injectable()
export class TypesService {
    constructor(private _appService: AppService) {}
    async getTypes() {
        return await this._appService.get('types');
    }
    async addType(type: IArticleType) {
        type.id = this._appService.generateUUID('XXXY-aYXXX-XXXXX');
        await this._appService.post(type, 'types', 'name');
        return type;
    }
}
