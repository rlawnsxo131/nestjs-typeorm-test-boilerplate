import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Post from '../domain/post.entity';
import { IPostQueryRepository, IPostService } from '../domain/usecase';
import { PostQueryRepository } from '../infra/persistence/repository/post.query.repository';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @InjectRepository(Post) private readonly repository: Repository<Post>,
    @Inject(PostQueryRepository)
    private readonly queryRepository: IPostQueryRepository,
  ) {}

  create(title: string, shortDescription: string) {
    return this.repository.save(Post.of(title, shortDescription));
  }

  findOneById(id: number) {
    return this.queryRepository.findOneById(id);
  }
}
