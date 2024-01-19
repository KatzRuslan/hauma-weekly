import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { TypesController } from './types.controller';
import { TypesService } from './types.service';

@Module({
    imports: [],
    controllers: [TypesController],
    providers: [TypesService, AppService]
})
export class TypesModule {}
