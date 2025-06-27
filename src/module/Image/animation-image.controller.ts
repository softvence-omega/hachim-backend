import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Delete,
  Param,
  Get,
  Res,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { ApiOperation, ApiConsumes, ApiBody, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateAnimationImageDto } from './dto/create-animation-image.dto';
import { AnimationImageService } from './animation-image.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import sendResponse from '../utils/sendResponse';


@ApiTags('Animation Image')
@Controller('animation-image')
export class AnimationImageController {
  constructor(private readonly service: AnimationImageService) {}


  @Get('/latest')
@Roles(Role.ADMIN,Role.SUPER_ADMIN, Role.USER)
async getLatestImages(@Res() res: Response) {
 
  const data = await this.service.findLatest(6);
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Latest animation images fetched successfully',
    data
  });
}

  @Post('create')
  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  @ApiOperation({ summary: 'Upload animation image (file optional)' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload animation image',
    schema: {
      type: 'object',
      properties: {
       
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: '/tmp',
        filename: (req, file, cb) => {
          const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body() dto: CreateAnimationImageDto,
    @Res() res: Response,
    @UploadedFile() file?: Express.Multer.File,
    
  ) {
    const data = await this.service.create(dto, file);
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Image uploaded successfully',
      data,
    });
  }

  @Delete(':id')
 @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  async remove(@Param('id') id: string, @Res() res: Response) {
    const data = await this.service.remove(id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Image deleted successfully',
      data,
    });
  }

  @Get()
  @Roles(Role.ADMIN,Role.SUPER_ADMIN)
  async getAll(@Res() res: Response) {
    const data = await this.service.findAll();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Images fetched successfully',
      data,
    });
  }

@Patch(':id')
@Roles(Role.ADMIN, Role.SUPER_ADMIN)
@ApiOperation({ summary: 'Update animation image (file optional)' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'Update animation image',
  schema: {
    type: 'object',
    properties: {
     
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: [],
  },
})
@UseInterceptors(
  FileInterceptor('file', {
    storage: diskStorage({
      destination: '/tmp',
      filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      },
    }),
  }),
)
async updateImage(
  @Param('id') id: string,
  @Body() dto: CreateAnimationImageDto,
  @Res() res: Response,
  @UploadedFile() file?: Express.Multer.File,
) {
  const data = await this.service.update(id, dto, file);
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Image updated successfully',
    data,
  });
}

@Get(':id')
@Roles(Role.ADMIN,Role.SUPER_ADMIN)
async getImageById(@Param('id') id: string, @Res() res: Response) {
  const data = await this.service.findOne(id);
  return sendResponse(res, {
    statusCode: HttpStatus.OK,
    success: true,
    message: 'Image fetched successfully',
    data,
  });
}



}
