import { Module } from '@nestjs/common';
import { ArticleController } from './controller/article.controller';
import { ArticleService } from './service/article.service';
import { ArticleEntity } from './entity/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleRepository } from './repository/article.repository';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository, AuthGuard],
})
export class ArticleModule {}
