import { ForbiddenException, Injectable } from '@nestjs/common';
import { ArticleRepository } from '../repository/article.repository';
import { ArticleDto } from '../dto/article.dto';
import { plainToInstance } from 'class-transformer';
import { ArticleEntity } from '../entity/article.entity';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}
  async findAll(page = 1, limit = 10): Promise<ArticleDto[]> {
    try {
      const skip = (page - 1) * limit;
      const articlesEntity = await this.articleRepository.findAll(limit, skip);
      return this.mapEntitiesToDtos(articlesEntity);
    } catch (error) {
      throw error;
    }
  }

  mapEntityToDto(article: ArticleEntity): ArticleDto {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...articleDto } = article;
    return articleDto;
  }

  mapEntitiesToDtos(articles: ArticleEntity[]): ArticleDto[] {
    return articles.map((article) => this.mapEntityToDto(article));
  }
  async createArticle(_article: ArticleDto, id: number) {
    try {
      const saveArticle = await this.articleRepository.createArticle(
        _article,
        id,
      );
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
    authorid: number,
    updateData: Partial<ArticleDto>,
  ) {
    try {
      const article = await this.articleRepository.getArticleById(id);
      if (article.user.id !== authorid) {
        throw new ForbiddenException(
          'You are not allowed to modify this article!',
        );
      }
      const updateArticle = await this.articleRepository.updateArticle(
        id,
        updateData,
      );
      console.log('Update successfully!', updateArticle);
    } catch (error) {
      throw error;
    }
  }

  async deleteArticle(id: number, authorid: number) {
    try {
      const article = await this.articleRepository.getArticleById(id);
      if (article.user.id !== authorid) {
        throw new ForbiddenException(
          'You are not allowed to delete this article!',
        );
      }
      const message = await this.articleRepository.deleteArticle(id);
      console.log(message);
    } catch (error) {
      throw error;
    }
  }
}
