import { Module } from '@nestjs/common';
import { ArticleController } from './controller/article.controller';
import { ArticleService } from './service/article.service';
import { ArticleEntity } from './entity/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
