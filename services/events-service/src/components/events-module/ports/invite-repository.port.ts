import { InviteEntity } from '../application/data/entities/invite.entity';
import { InvitePayload } from '../application/data/interfaces/invite-payload.interface';
import { EventEntity } from '../application/data/entities/event.entity';

export abstract class InviteRepositoryPort {
  abstract create(createArgs: InvitePayload): Promise<InviteEntity>;
  abstract findByEvent(event: EventEntity): Promise<InviteEntity[]>;
  abstract findByAccount(receiverId: string): Promise<InviteEntity[]>;
}
