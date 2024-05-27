import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetAccountByIdRequest {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
