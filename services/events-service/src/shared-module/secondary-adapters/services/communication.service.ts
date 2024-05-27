import { Inject, Injectable } from '@nestjs/common';
import { COMMUNICATION_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { RoomResponse } from '../../../components/events-module/application/data/responses/room.response';

@Injectable()
export class CommunicationService {
  constructor(
    @Inject(COMMUNICATION_SERVICE)
    private readonly communicationService: ClientProxy,
  ) {}

  createRoom(date: Date): Observable<RoomResponse> {
    return this.communicationService.send('create-call-room', { date });
  }
}
