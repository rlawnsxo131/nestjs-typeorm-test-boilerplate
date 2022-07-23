import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './application/post.service';
import Post from './domain/post.entity';
import { PostQueryRepository } from './infra/persistence/repository/post.query.repository';
import { PostController } from './controller/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostQueryRepository],
  controllers: [PostController],
})
export class PostModule {}
