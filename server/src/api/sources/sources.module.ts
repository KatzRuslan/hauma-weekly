import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { SourcesController } from './sources.controller';
import { SourcesService } from './sources.service';

@Module({
    imports: [],
    controllers: [SourcesController],
    providers: [SourcesService, AppService]
})
export class SourcesModule {}
