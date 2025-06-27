import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAnimationImageDto } from './dto/create-animation-image.dto';
import { Cloudinary } from 'src/shared/cloudinary/cloudinary.types';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class AnimationImageService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('CLOUDINARY') private cloudinary: Cloudinary,
  ) {}

  async create(dto: CreateAnimationImageDto, file?: Express.Multer.File) {
    try {
      let imageUrl = dto.imageUrl;
      let publicId: string | undefined;

      if (file) {
        const fileExt = file.originalname.split('.').pop();
        const fileName = file.originalname.split('.')[0];
        const originalFileName = `${fileName}-${Date.now()}.${fileExt}`;

        const uploadRes = await this.cloudinary.uploader.upload(file.path, {
          folder: 'animation-images',
          public_id: originalFileName,
        });

        imageUrl = uploadRes.secure_url;
        publicId = uploadRes.public_id;

        const filePath = join(process.cwd(), file.path);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }

      return await this.prisma.animationImage.create({
        data: {
          imageUrl,
          cloudinaryPublicId: publicId,
        },
      });
    } catch (err) {
      console.error('Error uploading animation image:', err);
      throw new InternalServerErrorException('Failed to upload image');
    }
  }

  async update(id: string, dto: CreateAnimationImageDto, file?: Express.Multer.File) {
    const existing = await this.prisma.animationImage.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Animation image not found');

    let imageUrl = dto.imageUrl || existing.imageUrl;
    let publicId = existing.cloudinaryPublicId;

    // If new file provided, upload to Cloudinary and remove old one
    if (file) {
      // Delete old file from Cloudinary
      if (existing.cloudinaryPublicId) {
        try {
          await this.cloudinary.uploader.destroy(existing.cloudinaryPublicId);
        } catch (error) {
          console.warn('Cloudinary deletion failed:', error.message);
        }
      }

      const uploadRes = await this.cloudinary.uploader.upload(file.path, {
        folder: 'animation-images',
        public_id: `${file.originalname.split('.')[0]}-${Date.now()}`,
      });

      imageUrl = uploadRes.secure_url;
      publicId = uploadRes.public_id;

      const filePath = join(process.cwd(), file.path);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    return this.prisma.animationImage.update({
      where: { id },
      data: {
        imageUrl,
        cloudinaryPublicId: publicId,
      },
    });
  }

  async remove(id: string) {
    const current = await this.prisma.animationImage.findUnique({ where: { id } });
    if (!current) throw new NotFoundException('Animation image not found');

    if (current.cloudinaryPublicId) {
      try {
        await this.cloudinary.uploader.destroy(current.cloudinaryPublicId);
      } catch (error) {
        console.warn('Cloudinary deletion failed:', error.message);
      }
    }

    return await this.prisma.animationImage.delete({ where: { id } });
  }

  async findAll() {
    return await this.prisma.animationImage.findMany();
  }

  async findOne(id: string) {
    const image = await this.prisma.animationImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Animation image not found');
    return image;
  }

  async findLatest(limit: number = 6) {
    
    return await this.prisma.animationImage.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }
}
