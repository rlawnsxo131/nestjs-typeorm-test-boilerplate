import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPostQueryRepository } from 'src/post/domain/usecase';
import { Repository } from 'typeorm';
import Post from '../../../domain/post.entity';

@Injectable()
export class PostQueryRepository implements IPostQueryRepository {
  constructor(
    @InjectRepository(Post) private readonly repository: Repository<Post>,
  ) {}

  findOneById(id: number) {
    return this.repository
      .createQueryBuilder('post')
      .select('post')
      .where('post.id = :id', { id })
      .getOne();
  }
}
