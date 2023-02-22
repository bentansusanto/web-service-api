import { Module } from '@nestjs/common';
import { ControllerService } from './controller/controller.service';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';

@Module({
  providers: [ControllerService, BlogsService],
  controllers: [BlogsController]
})
export class BlogsModule {}
