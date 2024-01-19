import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
    imports: [],
    controllers: [AuthorsController],
    providers: [AuthorsService, AppService]
})
export class AuthorsModule {}
