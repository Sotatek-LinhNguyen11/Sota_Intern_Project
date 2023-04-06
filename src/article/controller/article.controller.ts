import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ArticleService } from '../service/article.service';
import { ArticleDto } from '../dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Post('/create')
  async createArticle(@Body() article: ArticleDto) {
    await this.articleService.createArticle(article);
  }
  @Get('/articles')
  async getArticlesByName(
    @Param('title') title: string,
  ): Promise<ArticleDto[]> {
    return await this.articleService.getArticlesByName(title);
  }
  @Put('/:authorid/:id')
  async updateArticle(
    @Param('id') id: string,
    @Param('authorid') authorid: string,
    @Body() updateData: Partial<ArticleDto>,
  ) {
    await this.articleService.updateArticle(
      parseInt(id, 10),
      parseInt(authorid, 10),
      updateData,
    );
  }
}
