import { Controller, Get, Param } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('api')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get('blogs')
  findAllBlogs() {
    return this.blogsService.findAllBlogs();
  }

  @Get('blogs/:id')
  findBlogById(@Param('id') id: string) {
    return this.blogsService.findAllBlogsById(id);
  }
}
