import { InviteRepositoryPort } from '../ports/invite-repository.port';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InviteEntity } from '../application/data/entities/invite.entity';
import { MoreThan, Repository } from 'typeorm';
import { EventEntity } from '../application/data/entities/event.entity';
import { InvitePayload } from '../application/data/interfaces/invite-payload.interface';

@Injectable()
export class PostgresInviteRepositoryAdapter implements InviteRepositoryPort {
  constructor(
    @InjectRepository(InviteEntity)
    private readonly inviteRepository: Repository<InviteEntity>,
  ) {}

  findByAccount(receiverId: string): Promise<InviteEntity[]> {
    const currentDate = new Date();

    return this.inviteRepository.find({
      where: { receiverId, event: { date: MoreThan(currentDate) } },
      relations: { event: true },
    });
  }

  create({
    event,
    inviteText,
    sender,
    receiver,
  }: InvitePayload): Promise<InviteEntity> {
    return this.inviteRepository.save({
      event,
      inviteText,
      senderId: sender.id,
      receiverId: receiver.id,
    });
  }

  findByEvent(event: EventEntity): Promise<InviteEntity[]> {
    return this.inviteRepository.find({ where: { event } });
  }
}
