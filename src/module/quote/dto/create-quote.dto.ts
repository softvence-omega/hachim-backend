import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuoteDto {
  @ApiProperty({
    example: 'Albert Einstein',
    description: 'Name of the person who said the quote',
  })
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    example: 'Life is like riding a bicycle. To keep your balance you must keep moving.',
    description: 'The quote text',
  })
  @IsString({ message: 'Quote must be a string' })
  @IsNotEmpty({ message: 'Quote is required' })
  quote: string;

  @ApiPropertyOptional({
    example: 'https://example.com/image.jpg',
    description: 'Optional URL to an image associated with the quote',
  })
  @IsOptional()
  @IsString({ message: 'Image URL must be a string' })
  imageUrl?: string;
}
