import { Controller, Get } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('api')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get('blogs')
  findAllBlogs() {
    return this.blogsService.findAllBlogs();
  }
}
