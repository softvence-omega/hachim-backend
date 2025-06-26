import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
    return cloudinary;
  },
  inject: [ConfigService],
};

// import { v2 as cloudinary } from 'cloudinary';
// import { ConfigService } from '@nestjs/config';

// export const CloudinaryProvider = {
//   provide: 'CLOUDINARY',
//   useFactory: (configService: ConfigService) => {
//     const cloudName = configService.get<string>('CLOUDINARY_CLOUD_NAME');
//     const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
//     const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');

//     // Log credentials - ONLY FOR DEBUGGING PURPOSES
//     console.log('Cloudinary Configuration:');
//     console.log(`CLOUD_NAME: ${cloudName}`);
//     console.log(`API_KEY: ${apiKey}`);
//     console.log(`API_SECRET: ${apiSecret}`);

//     cloudinary.config({
//       cloud_name: cloudName,
//       api_key: apiKey,
//       api_secret: apiSecret,
//     });

//     return cloudinary;
//   },
//   inject: [ConfigService],
// };

