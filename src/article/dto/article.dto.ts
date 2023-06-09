import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Expose, Transform } from 'class-transformer';
import { ArticleGenre } from '../entity/article.entity';

export class ArticleDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  title: string;

  @Expose()
  @IsNotEmpty()
  @IsEnum(ArticleGenre)
  topic: ArticleGenre;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @Transform(({ value }) => value.trim())
  content: string;
}
