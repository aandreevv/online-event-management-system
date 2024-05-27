import { IsNotEmpty, IsUUID } from 'class-validator';

export class JoinRoomRequest {
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  @IsUUID()
  @IsNotEmpty()
  accountId: string;
}
