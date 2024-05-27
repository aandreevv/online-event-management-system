import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CallParticipantEntity } from '../../../../rooms-module/application/data/entities/call-participant.entity';

@Entity()
export class CommunicationIdentity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  accountId: string;

  @Column()
  identityId: string;

  @OneToMany(
    () => CallParticipantEntity,
    (callParticipant) => callParticipant.identity,
    { onDelete: 'CASCADE' },
  )
  calls: CallParticipantEntity[];
}
