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
  async findAll(limit: number, skip: number): Promise<ArticleEntity[]> {
    return await this.repository.find({
      take: limit,
      skip: skip,
    });
  }
  async createArticle(article: ArticleDto, id: number): Promise<ArticleEntity> {
    return await this.repository.save({ ...article, user: { id } });
  }
  async getArticlesByName(title: string): Promise<ArticleEntity[]> {
    return await this.repository.find({
      where: {
        title: title,
      },
    });
  }

  async getArticleById(id: number): Promise<ArticleEntity> {
    return await this.repository.findOne({
      relations: ['user'],
      where: {
        id: id,
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

  async deleteArticle(id: number): Promise<string> {
    await this.repository.delete(id);
    return 'Delete success!';
  }
}
