import { Inject, Injectable } from '@nestjs/common';
import { COMMUNICATION_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { AuthenticatedAccountResponse } from '../../auth-module/application/data/responses/authenticated-account.response';
import { Observable } from 'rxjs';
import { RoomResponse } from '../application/data/responses/room.response';
import { CommunicationTokenResponse } from '../application/data/responses/communication-token.response';

@Injectable()
export class CommunicationService {
  constructor(@Inject(COMMUNICATION_SERVICE) private readonly communicationService: ClientProxy) {}

  getCommunicationToken(account: AuthenticatedAccountResponse): Observable<CommunicationTokenResponse> {
    return this.communicationService.send('get-communication-token', { accountId: account.id });
  }

  createRoom(account: AuthenticatedAccountResponse): Observable<RoomResponse> {
    return this.communicationService.send('create-call-room', { accountId: account.id });
  }

  joinRoom(account: AuthenticatedAccountResponse, roomId: string): Observable<RoomResponse> {
    return this.communicationService.send('join-call-room', { accountId: account.id, roomId });
  }
}
