import { ConflictException, Injectable } from '@nestjs/common';
import { ProfileRepositoryPort } from '../ports/profile-repository.port';
import { ProfileEntity } from '../application/data/entities/profile.entity';
import { CreateProfileRequest } from '../application/data/requests/create-profile.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../application/data/entities/account.entity';
import { RpcException } from '@nestjs/microservices';
import { USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS, USER_WITH_SUCH_USERNAME_ALREADY_EXISTS } from '../../../exceptions';

@Injectable()
export class PostgresProfileRepositoryAdapter implements ProfileRepositoryPort {
  constructor(@InjectRepository(ProfileEntity) private readonly profileEntityRepository: Repository<ProfileEntity>) {}

  async findByAccountId(accountId: string): Promise<ProfileEntity> {
    return this.profileEntityRepository.findOne({
      where: {
        account: { id: accountId },
      },
      relations: { account: true },
    });
  }

  findByPhoneNumber(phoneNumber: string): Promise<ProfileEntity> {
    return this.profileEntityRepository.findOne({ where: { phoneNumber } });
  }

  findByUsername(username: string): Promise<ProfileEntity> {
    return this.profileEntityRepository.findOne({ where: { username } });
  }

  async create(createArgs: CreateProfileRequest, account: AccountEntity): Promise<ProfileEntity> {
    const withSuchUsername = await this.findByUsername(createArgs.username);
    if (withSuchUsername) throw new RpcException(new ConflictException(USER_WITH_SUCH_USERNAME_ALREADY_EXISTS));
    const withSuchPhone = await this.findByPhoneNumber(createArgs.phoneNumber);
    if (withSuchPhone) throw new RpcException(new ConflictException(USER_WITH_SUCH_PHONE_NUMBER_IS_ALREADY_EXISTS));
    return this.profileEntityRepository.save({ ...createArgs, account });
  }
}
