import { Inject, Injectable } from '@nestjs/common';
import { COMMUNICATION_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class CommunicationService {
  constructor(@Inject(COMMUNICATION_SERVICE) private readonly communicationService: ClientProxy) {}

  sendAccountCreatedTrigger(accountId: string): Observable<void> {
    return this.communicationService.emit('account_created', { accountId });
  }
}
