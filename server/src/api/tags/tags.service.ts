import { Injectable } from '@nestjs/common';
import { AppService } from 'src/app.service';

@Injectable()
export class TagsService {
    constructor(private _appService: AppService) {}
    async getTags() {
        return await this._appService.get('tags');
    }
    async addTag(tag: string) {
        const tags = await this.getTags();
        if (!tags.find((item: string) => item === tag)) {
            await this._appService.set([...tags, tag], 'tags');
        }
        return tag;
    }
    async addTags(tagList: string[]) {
        const tags = await this.getTags();
        const newTags = [];
        tagList.forEach((tag) => {
            if (!tags.find((item: string) => item === tag)) {
                newTags.push(tag);
            }
        });
        await this._appService.set([...tags, ...newTags], 'tags');
        return newTags;
    }
}
