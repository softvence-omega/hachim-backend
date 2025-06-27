import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

import { AnimationImageController } from './animation-image.controller';
import { AnimationImageService } from './animation-image.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [AnimationImageController],
  providers: [AnimationImageService, PrismaService],
})
export class AnimationImageModule {}
