import { IsOptional } from 'class-validator';
import { LanguageEnum } from '../enums/language.enum';

export class EditProfileRequest {
  @IsOptional()
  fullName?: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  dateOfBirth?: Date;

  @IsOptional()
  bio?: string;

  @IsOptional()
  picture?: string;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  language?: LanguageEnum;
}
