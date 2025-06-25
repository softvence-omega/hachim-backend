import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cloudinary } from 'src/shared/cloudinary/cloudinary.types';
import * as fs from 'fs';
import { join } from 'path';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    private prisma: PrismaService,
    @Inject('CLOUDINARY') private cloudinary: Cloudinary,
  ) {}

  async create(dto: CreateVideoDto, file?: Express.Multer.File) {
    try {
      let videoUrl = dto.videoUrl;
      let publicId: string | undefined;

      if (file) {
         const fileExt = file.originalname.split('.').pop()
    const fileName =file.originalname.split('.')[0]
    const originalFileName = `${fileName}-${Date.now()}.${fileExt}`; 
        const uploadRes = await this.cloudinary.uploader.upload(file.path, {
          resource_type: 'video',
          folder: 'videos',
          public_id:originalFileName
        });
        videoUrl = uploadRes.secure_url;
        publicId = uploadRes.public_id;
       const filePath = join(process.cwd(), file.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        } // cleanup local file
      }

      return await this.prisma.video.create({
        data: {
          title: dto.title,
          videoUrl,
          cloudinaryPublicId: publicId,
        },
      });
    } catch (err) {
      console.error('Error uploading video:', err);
      throw new InternalServerErrorException('Failed to upload video');
    }
  }

  async findAll() {
    return this.prisma.video.findMany({take:100});
  }

  async findOne(id: string) {
     const existing = await this.prisma.video.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Video not found');
    return existing
  }

  async update(id: string, dto: UpdateVideoDto, file?: Express.Multer.File) {
    const existing = await this.prisma.video.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Video not found');

    let videoUrl = existing.videoUrl;
    let publicId = existing.cloudinaryPublicId;

    if (file) {
      if (publicId) {
        await this.cloudinary.uploader.destroy(publicId, {
          resource_type: 'video',
        });
      }
 const fileExt = file.originalname.split('.').pop()
    const fileName =file.originalname.split('.')[0]
    const originalFileName = `${fileName}-${Date.now()}.${fileExt}`; 
      const uploadRes = await this.cloudinary.uploader.upload(file.path, {
        resource_type: 'video',
        folder: 'videos',
        public_id:originalFileName
      });
      videoUrl = uploadRes.secure_url;
      publicId = uploadRes.public_id;
      const filePath = join(process.cwd(), file.path);
       if (fs.existsSync(filePath)) {
         fs.unlinkSync(filePath);
       }
    }

    return this.prisma.video.update({
      where: { id },
      data: {
        title: dto.title ?? existing.title,
        videoUrl,
        cloudinaryPublicId: publicId,
      },
    });
  }

  async remove(id: string) {
    const existing = await this.prisma.video.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Video not found');

    if (existing.cloudinaryPublicId) {
      await this.cloudinary.uploader.destroy(existing.cloudinaryPublicId, {
        resource_type: 'video',
      });
    }

    return this.prisma.video.delete({ where: { id } });
  }
}
