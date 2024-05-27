import { Injectable } from '@nestjs/common';
import { AccountRepositoryPort } from '../ports/account-repository.port';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from '../application/data/entities/account.entity';
import { In, Repository } from 'typeorm';
import { CreateAccountRequest } from '../application/data/requests/create-account.request';

@Injectable()
export class PostgresAccountRepositoryAdapter implements AccountRepositoryPort {
  constructor(@InjectRepository(AccountEntity) private readonly accountRepository: Repository<AccountEntity>) {}

  findByIds(ids: string[]): Promise<AccountEntity[]> {
    return this.accountRepository.find({ where: { id: In(ids) }, relations: { profile: true } });
  }

  searchUsers(search: string, accountId: string): Promise<AccountEntity[]> {
    return this.accountRepository
      .createQueryBuilder('account')
      .leftJoinAndSelect('account.profile', 'profile')
      .where('LOWER(profile.username) LIKE :search', { search: `%${search}%` })
      .orWhere('LOWER(profile.fullName) LIKE :search', { search: `%${search}%` })
      .andWhere('account.id != :accountId', { accountId })
      .getMany();
  }

  public async save(createArgs: CreateAccountRequest): Promise<AccountEntity> {
    return this.accountRepository.save(createArgs);
  }

  public async findById(id: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { id }, relations: { profile: true } });
  }

  public async findByEmail(email: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({ where: { email } });
  }
}
