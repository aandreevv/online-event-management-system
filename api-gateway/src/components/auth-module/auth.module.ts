import { Module } from '@nestjs/common';
import { AuthController } from './primary-adapters/auth.controller';
import { COMMUNICATION_SERVICE, USERS_SERVICE } from '../../constants/services';
import { UsersService } from './secondary-adapters/users.service';
import { CommunicationService } from './secondary-adapters/communication.service';
import { AuthGuard } from './application/data/guards/auth.guard';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';

@Module({
  controllers: [AuthController],
  imports: [MicroserviceConnectionModule.register(USERS_SERVICE), MicroserviceConnectionModule.register(COMMUNICATION_SERVICE)],
  providers: [UsersService, CommunicationService, AuthGuard],
  exports: [AuthGuard, UsersService],
})
export class AuthModule {}
