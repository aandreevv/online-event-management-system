import { IsOptional, ValidateNested } from 'class-validator';
import { EditProfileRequest } from './edit-profile.request';

export class EditAccountRequest {
  @IsOptional()
  email?: string;

  @ValidateNested()
  profile: EditProfileRequest;
}
