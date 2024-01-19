import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
    imports: [],
    controllers: [CategoriesController],
    providers: [CategoriesService, AppService]
})
export class CategoriesModule {}
