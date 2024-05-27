import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({})
export class MicroserviceConnectionModule {
  static register(serviceName: string): DynamicModule {
    return {
      module: MicroserviceConnectionModule,
      exports: [ClientsModule],
      imports: [
        ClientsModule.registerAsync([
          {
            name: serviceName,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('RMQ_URI')],
                queue: configService.get<string>(`RMQ_${serviceName}_QUEUE`),
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
    };
  }
}
