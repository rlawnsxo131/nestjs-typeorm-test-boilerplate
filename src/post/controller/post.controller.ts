import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from '../application/dto/create-post.dto';
import { PostService } from '../application/post.service';

@Controller('/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get(':id')
  async get(@Param('id') id: string) {
    const parseId = parseInt(id);
    const post = await this.postService.findOneById(parseId);
    return post;
  }

  @Post()
  async create(@Body() dto: CreatePostDto) {
    const post = await this.postService.create(
      dto.title,
      dto.short_description,
    );
    return post;
  }
}
