import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repository/article.repository';
import { ArticleDto } from '../dto/article.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}
  async createArticle(_article: ArticleDto) {
    try {
      const saveArticle = this.articleRepository.createArticle(_article);
      console.log('Save successfully!', saveArticle);
    } catch (error) {
      throw error;
    }
  }
  async getArticlesByName(title: string): Promise<ArticleDto[]> {
    try {
      const listArticles = await this.articleRepository.getArticlesByName(
        title,
      );
      return plainToInstance(ArticleDto, listArticles, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateArticle(
    id: number,
    auhtorid: number,
    updateData: Partial<ArticleDto>,
  ) {
    try {
      const updateArticle = await this.articleRepository.updateArticle(
        id,
        updateData,
      );
      console.log('Update successfully!', updateArticle);
    } catch (error) {
      throw error;
    }
  }
}
