import {
  IsDateString,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateProfileDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
  @IsDateString()
  @IsOptional()
  dob: Date;
}
