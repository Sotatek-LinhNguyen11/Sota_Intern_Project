import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './controller/article.controller';
import { ArticleEntity } from './entity/article.entity';
import { ArticleRepository } from './repository/article.repository';
import { ArticleService } from './service/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
