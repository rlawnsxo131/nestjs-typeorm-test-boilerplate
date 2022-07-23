import { IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @Length(1, 50)
  readonly title: string;

  @IsString()
  @Length(1, 150)
  readonly short_description: string;
}
