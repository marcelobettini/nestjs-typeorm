import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;

  @IsDateString()
  @IsOptional()
  createdAt: Date;
}
