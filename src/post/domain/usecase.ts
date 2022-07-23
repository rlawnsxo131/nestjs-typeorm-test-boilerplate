import Post from './post.entity';

export interface IPostService {
  create(title: string, shortDescription: string): Promise<Post>;
  findOneById(id: number): Promise<Post>;
}

export interface IPostQueryRepository {
  findOneById(id: number): Promise<Post>;
}
