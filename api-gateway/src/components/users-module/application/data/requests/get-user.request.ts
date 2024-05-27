import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetUserRequest {
  @ApiProperty({ description: 'Id of existing user ' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
