import { Module } from '@nestjs/common';
import { ErrorHandlingFromMicroserviceService } from './secondary-adapters/microservices/error-handling-from-microservice.service';
import { MicroserviceConnectionModule } from '@aandreevv/microservice-connection-lib';
import { EVENTS_SERVICE, UPLOADS_SERVICE } from '../constants/services';
import { EventsService } from './secondary-adapters/microservices/events.service';
import { UploadsService } from './secondary-adapters/microservices/uploads.service';

@Module({
  providers: [ErrorHandlingFromMicroserviceService, EventsService, UploadsService],
  exports: [ErrorHandlingFromMicroserviceService, EventsService, UploadsService],
  imports: [MicroserviceConnectionModule.register(EVENTS_SERVICE), MicroserviceConnectionModule.register(UPLOADS_SERVICE)],
})
export class SharedModule {}
