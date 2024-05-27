export interface IConfiguration {
  port: number;
  environment: string;
  azureCommunicationConnectionString: string;
}

export const config: IConfiguration = {
  port: parseInt(process.env.PORT, 10),
  environment: process.env.ENVIRONMENT,
  azureCommunicationConnectionString:
    process.env.AZURE_COMMUNICATION_CONNECTION_STRING,
};

export const configuration = (): IConfiguration => config;
