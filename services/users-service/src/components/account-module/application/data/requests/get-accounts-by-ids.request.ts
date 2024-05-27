import { ArrayNotEmpty, IsArray, IsString } from 'class-validator';

export class GetAccountsByIdsRequest {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  ids: string[];
}
