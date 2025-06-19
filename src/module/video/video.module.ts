import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  imports:[CloudinaryModule],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
