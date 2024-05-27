import { AccountResponse } from './account.response';
import { ProfileFullResponse } from './profile-full.response';
import { ApiProperty } from '@nestjs/swagger';

export class AccountFullResponse extends AccountResponse {
  @ApiProperty()
  profile: ProfileFullResponse;
}
