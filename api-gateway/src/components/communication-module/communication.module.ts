import { Module } from '@nestjs/common';
import { COMMUNICATION_SERVICE } from '../../constants/services';
import { CommunicationController } from './primary-adapters/communication.controller';
import { CommunicationService } from './secondary-adapters/communication.service';
import { AuthModule } from '../auth-module/auth.module';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';

@Module({
  exports: [],
  imports: [MicroserviceConnectionModule.register(COMMUNICATION_SERVICE), AuthModule],
  providers: [CommunicationService],
  controllers: [CommunicationController],
})
export class CommunicationModule {}
