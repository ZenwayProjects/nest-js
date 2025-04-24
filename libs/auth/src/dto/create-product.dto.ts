import { IsString, IsNumber, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name!: string;

  @IsNumber()
  price!: number;

  @IsString()
  userId: string;
}
