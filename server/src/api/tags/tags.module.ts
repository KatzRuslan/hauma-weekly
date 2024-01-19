import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
    imports: [],
    controllers: [TagsController],
    providers: [TagsService, AppService]
})
export class TagsModule {}
