import { Inject, Injectable } from '@nestjs/common';
import { EVENTS_SERVICE } from '../../../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { CreateEventRequest } from '../../../components/events-module/application/data/requests/create-event.request';
import { catchError, Observable } from 'rxjs';
import { EventResponse } from '../../../components/events-module/application/data/responses/event.response';
import { ErrorHandlingFromMicroserviceService } from './error-handling-from-microservice.service';
import { GetEventRequest } from '../../../components/events-module/application/data/requests/get-event.request';
import { AccountInterface } from '../../../components/auth-module/application/data/interfaces/account.interface';
import { AccountResponse } from '../../../components/users-module/application/data/responses/account.response';
import { InviteUserToEventParamsRequest } from '../../../components/events-module/application/data/requests/invite-user-to-event.params.request';
import { InviteUserToEventBodyRequest } from '../../../components/events-module/application/data/requests/invite-user-to-event.body.request';
import { GetUserRequest } from '../../../components/users-module/application/data/requests/get-user.request';
import { PastAndFutureEventsResponse } from '../../../components/users-module/application/data/responses/past-and-future-events.response';
import { EventInviteReceiverResponse } from '../../../components/events-module/application/data/responses/event-invite-receiver.response';
import { EventInviteSenderResponse } from '../../../components/events-module/application/data/responses/event-invite-sender.response';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_SERVICE) private readonly eventsService: ClientProxy,
    private readonly errorHandlingFromMicroserviceService: ErrorHandlingFromMicroserviceService,
  ) {}

  createEvent(body: CreateEventRequest, account: AccountInterface): Observable<EventResponse> {
    return this.eventsService
      .send('create-event', { ...body, ownerId: account.id })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  attendEvent(body: GetEventRequest, account: AccountInterface): Observable<AccountResponse[]> {
    return this.eventsService
      .send('attend_event', { ...body, account })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getEvent(body: GetEventRequest): Observable<EventResponse> {
    return this.eventsService
      .send('get_event', body)
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getEventAttendees(body: GetEventRequest): Observable<EventResponse> {
    return this.eventsService
      .send('get_event_attendees', body)
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  inviteUser(
    params: InviteUserToEventParamsRequest,
    body: InviteUserToEventBodyRequest,
    account: AccountInterface,
  ): Observable<EventInviteReceiverResponse> {
    return this.eventsService
      .send('invite_user', { ...params, ...body, sender: account })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getEventInvites(body: GetEventRequest, account: AccountInterface): Observable<EventInviteReceiverResponse[]> {
    return this.eventsService
      .send('get_event_invites', { ...body, account })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserEvents(body: GetUserRequest): Observable<PastAndFutureEventsResponse> {
    return this.eventsService
      .send('get_user_events', { id: body.userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserAttendances(body: GetUserRequest): Observable<EventResponse[]> {
    return this.eventsService
      .send('get_user_attendances', { id: body.userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }

  getUserInvites(body: GetUserRequest): Observable<EventInviteSenderResponse[]> {
    return this.eventsService
      .send('get_user_invites', { id: body.userId })
      .pipe(catchError((error) => this.errorHandlingFromMicroserviceService.handleError(error)));
  }
}
