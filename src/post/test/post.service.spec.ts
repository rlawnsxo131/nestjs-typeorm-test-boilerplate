import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostService } from '../application/post.service';
import Post from '../domain/post.entity';
import { PostQueryRepository } from '../infra/persistence/repository/post.query.repository';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

/**
 * https://darrengwon.tistory.com/1004?category=915252
 * https://github.com/dextto/nestjs_sample/blob/main/src/user/application/command/create-user.command.handler.spec.ts
 */
describe('PostService', () => {
  let service: PostService;

  let mockPostRepository: MockRepository<Post>;
  let mockPostQueryRepository: PostQueryRepository;

  const id = 1;
  const title = 'post title';
  const short_description = 'post short_description';

  beforeAll(async () => {
    const modules = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useValue: jest.fn(),
        },
        {
          provide: PostQueryRepository,
          useValue: {
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = modules.get<PostService>(PostService);

    mockPostRepository = modules.get(getRepositoryToken(Post));
    mockPostQueryRepository = modules.get(PostQueryRepository);
  });

  it('findOneById', async () => {
    const post = Post.of(title, short_description);
    post.id = id;
    mockPostQueryRepository.findOneById = jest.fn().mockReturnValue(post);

    const result = await service.findOneById(1);

    expect(service).toBeDefined();
    expect(mockPostQueryRepository.findOneById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(post);
  });

  it('save', async () => {
    const post = Post.of(title, short_description);
    const spyFn = jest.spyOn(Post, 'of');
    mockPostRepository.save = jest.fn().mockReturnValueOnce(post);

    const result = await service.create(title, short_description);

    expect(spyFn).toBeCalledTimes(1);
    expect(mockPostRepository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual(post);
  });
});
