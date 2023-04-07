import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../entity/article.entity';
import { ArticleDto } from '../dto/article.dto';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
  ) {}
  async createArticle(article: ArticleDto): Promise<ArticleEntity> {
    const saveArticle = await this.repository.create({
      title: article.title,
      topic: article.topic,
      content: article.content,
    });
    return await this.repository.save(saveArticle);
  }
  async getArticlesByName(title: string): Promise<ArticleEntity[]> {
    return await this.repository.find({
      where: {
        title: title,
      },
    });
  }

  async updateArticle(
    id: number,
    updateData: Partial<ArticleDto>,
  ): Promise<ArticleEntity> {
    const article = await this.repository.findOneById(id);
    Object.assign(article, updateData);
    return await this.repository.save(article);
  }
}
