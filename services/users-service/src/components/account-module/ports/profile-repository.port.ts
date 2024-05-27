import { CreateProfileRequest } from '../application/data/requests/create-profile.request';
import { ProfileEntity } from '../application/data/entities/profile.entity';
import { AccountEntity } from '../application/data/entities/account.entity';

export abstract class ProfileRepositoryPort {
  abstract create(createArgs: CreateProfileRequest, account: AccountEntity): Promise<ProfileEntity>;

  abstract findByUsername(username: string): Promise<ProfileEntity>;

  abstract findByPhoneNumber(phoneNumber: string): Promise<ProfileEntity>;

  abstract findByAccountId(accountId: string): Promise<ProfileEntity>;
}
