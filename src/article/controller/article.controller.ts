import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ArticleDto } from '../dto/article.dto';
import { ArticleService } from '../service/article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createArticle(@Body() article: ArticleDto, @Request() req: any) {
    await this.articleService.createArticle(article, req.user.id);
  }
  @Get('/get')
  async getArticlesByName(
    @Param('title') title: string,
  ): Promise<ArticleDto[]> {
    return await this.articleService.getArticlesByName(title);
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  async updateArticle(
    @Param('id') id: string,
    @Request() req: any,
    @Body() updateData: Partial<ArticleDto>,
  ) {
    await this.articleService.updateArticle(
      parseInt(id, 10),
      req.user.id,
      updateData,
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/delete/:id')
  async deleteArticle(@Param('id') id: string, @Request() req: any) {
    await this.articleService.deleteArticle(parseInt(id, 10), req.user.id);
  }
}
