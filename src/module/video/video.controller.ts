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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import sendResponse from '../utils/sendResponse';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('create')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Create a video with file upload' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Create Video',
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My video title' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title', 'file'],
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/videos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async create(
    @Body() dto: CreateVideoDto,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log(file)
    if (!file) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: 'File is required',
      });
    }

    const data = await this.videoService.create(dto, file);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Video uploaded successfully',
      data,
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const data = await this.videoService.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'All videos retrieved successfully',
      data,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const data = await this.videoService.findOne(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Single video retrieved successfully',
      data,
    });
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/videos',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
  }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateVideoDto,
     @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const data = await this.videoService.update(id, dto, file);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Video updated successfully',
      data,
    });
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async delete(@Param('id') id: string, @Res() res: Response) {
    const data = await this.videoService.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Video deleted successfully',
      data,
    });
  }
}
