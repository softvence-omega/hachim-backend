import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import sendResponse from '../utils/sendResponse';
import { Response } from 'express';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('create')
  @Roles(Role.ADMIN)
  async create(@Body() dto: CreateArticleDto, @Res() res: Response) {
    const data = await this.articleService.create(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Article created successfully',
      data,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.articleService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'All articles retrieved',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.articleService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Article retrieved successfully',
      data,
    });
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateArticleDto,
    @Res() res: Response,
  ) {
    const data = await this.articleService.update(id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Article updated successfully',
      data,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.articleService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Article deleted successfully',
      data,
    });
  }
}
