import { Module } from '@nestjs/common';
import { USERS_SERVICE } from '../../constants/services';
import { FollowService } from './secondary-adapters/follow.service';
import { SharedModule } from '../../shared-module/shared-module';
import { UsersController } from './primary-adapters/users.controller';
import { AuthModule } from '../auth-module/auth.module';
import { UsersService } from './secondary-adapters/users.service';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';

@Module({
  controllers: [UsersController],
  providers: [FollowService, UsersService],
  imports: [MicroserviceConnectionModule.register(USERS_SERVICE), SharedModule, AuthModule],
})
export class UsersModule {}
