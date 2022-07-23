import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export default class Post {
  @PrimaryGeneratedColumn({ unsigned: true })
  id!: number;

  @Index()
  @Column({ length: 50, nullable: false })
  title!: string;

  @Index()
  @Column({ length: 150, nullable: true, default: null })
  short_description?: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  static of(title: string, shortDescription?: string) {
    if (!title) {
      throw new Error('invalid args');
    }
    const post = new Post();
    post.title = title;
    post.short_description = shortDescription;
    return post;
  }
}
