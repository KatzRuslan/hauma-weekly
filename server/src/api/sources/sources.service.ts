import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { ISource } from '../api.interfaces';

@Injectable()
export class SourcesService {
    constructor(private _appService: AppService) {}
    async getSources() {
        return await this._appService.get('sources');
    }
    async addSource(source: ISource) {
        source.id = this._appService.generateUUID('XXXY-sYXXX-XXXXX');
        await this._appService.post(source, 'sources', 'name');
        return source;
    }
}
