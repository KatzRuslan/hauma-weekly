import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ICategory } from '../api.interfaces';

@Injectable()
export class CategoriesService {
    constructor(private _appService: AppService) {}
    async getCategories() {
        return await this._appService.get('categories');
    }
    async addCategory(category: ICategory) {
        category.id = this._appService.generateUUID('XXXY-cYXXX-XXXXX');
        await this._appService.post(category, 'categories', 'name');
        return category;
    }
}
