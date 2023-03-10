import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blogs } from './schema/blogs.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blogs.name)
    private blogsModel: Model<Blogs>,
  ) {}

  async findAllBlogs(): Promise<any> {
    const blogs = await this.blogsModel.find();

    return {
      blogs,
    };
  }

  async findAllBlogsById(id: string): Promise<any> {
    const blog = await this.blogsModel.findById(id);

    if (!blog) {
      throw new NotFoundException('Blog not found');
    }

    return {
      blog,
    };
  }
}
