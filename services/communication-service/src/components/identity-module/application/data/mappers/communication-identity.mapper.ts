import { CommunicationIdentity } from '../entities/communication-identity.entity';
import { CommunicationUserType } from '../types/communication-user.type';

export class CommunicationIdentityMapper {
  static requestToEntity(
    userPayload: CommunicationUserType,
  ): CommunicationIdentity {
    const entity = new CommunicationIdentity();
    entity.accountId = userPayload.accountId;
    entity.identityId = userPayload.communicationUserId;
    return entity;
  }
}
