import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './application/data/entities/event.entity';
import { AttendeeEntity } from './application/data/entities/attendee.entity';
import { InviteEntity } from './application/data/entities/invite.entity';
import { EventRepositoryPort } from './ports/event-repository.port';
import { PostgresEventRepositoryAdapter } from './secondary-adapters/postgres-event-repository.adapter';
import { SharedModule } from '../../shared-module/shared.module';
import { CreateEvent } from './application/usecases/create-event.usecase';
import { EventsController } from './primary-adapters/events.controller';
import { AttendeeRepositoryPort } from './ports/attendee-repository.port';
import { PostgresAttendeeRepositoryAdapter } from './secondary-adapters/postgres-attendee-repository.adapter';
import { AttendEvent } from './application/usecases/attend-event.usecase';
import { GetEvent } from './application/usecases/get-event.usecase';
import { GetEventAttendees } from './application/usecases/get-event-attendees.usecase';
import { InviteRepositoryPort } from './ports/invite-repository.port';
import { PostgresInviteRepositoryAdapter } from './secondary-adapters/postgres-invite-repository.adapter';
import { InviteUserToEvent } from './application/usecases/invite-user-to-event.usecase';
import { GetEventInvites } from './application/usecases/get-event-invites.usecase';
import { CountEventsByOwner } from './application/usecases/count-events-by-owner.usecase';
import { GetUserEvents } from './application/usecases/get-user-events.usecase';
import { GetUserInvites } from './application/usecases/get-user-invites.usecase';
import { GetUserAttendances } from './application/usecases/get-user-attendances.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventEntity, AttendeeEntity, InviteEntity]),
    SharedModule,
  ],
  controllers: [EventsController],
  providers: [
    {
      provide: EventRepositoryPort,
      useClass: PostgresEventRepositoryAdapter,
    },
    {
      provide: AttendeeRepositoryPort,
      useClass: PostgresAttendeeRepositoryAdapter,
    },
    {
      provide: InviteRepositoryPort,
      useClass: PostgresInviteRepositoryAdapter,
    },
    CreateEvent,
    AttendEvent,
    GetEvent,
    GetEventAttendees,
    InviteUserToEvent,
    GetEventInvites,
    CountEventsByOwner,
    GetUserEvents,
    GetUserInvites,
    GetUserAttendances,
  ],
  exports: [],
})
export class EventsModule {}
