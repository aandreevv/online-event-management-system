import { Injectable, NotFoundException } from '@nestjs/common';
import { AccountRepositoryPort } from '../../ports/account-repository.port';
import { AccountResponse } from '../data/responses/account.response';
import { GetAccountByIdRequest } from '../data/requests/get-account-by-id.request';
import { RpcException } from '@nestjs/microservices';
import { ACCOUNT_IS_NOT_FOUND } from '../../../../exceptions';
import { FollowRepositoryPort } from '../../ports/follow-repository.port';
import { AccountMapper } from '../data/mappers/account.mapper';
import { firstValueFrom } from 'rxjs';
import { EventsService } from '../../../../shared-module/secondary-adapters/microservices/events.service';

@Injectable()
export class GetProfileById {
  constructor(
    private readonly accountRepository: AccountRepositoryPort,
    private readonly followRepositoryPort: FollowRepositoryPort,
    private readonly eventsService: EventsService,
  ) {}

  async execute({ id }: GetAccountByIdRequest): Promise<AccountResponse> {
    const account = await this.accountRepository.findById(id);
    if (!account) throw new RpcException(new NotFoundException(ACCOUNT_IS_NOT_FOUND));
    const followers = await this.followRepositoryPort.countFollowers(account.profile);
    const followings = await this.followRepositoryPort.countFollowings(account.profile);
    const { events } = await firstValueFrom(this.eventsService.countEventsByOwner({ id }));
    return AccountMapper.requestToGetResponse(account, { followings, followers, events });
  }
}
