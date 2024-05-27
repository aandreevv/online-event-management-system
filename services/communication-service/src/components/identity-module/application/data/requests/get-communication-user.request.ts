import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCommunicationUserRequest {
  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}
