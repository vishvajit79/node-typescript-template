import { Config } from '../server/models/config';

export const testConfig: Config = {
  serviceConfig: {
    name: 'Microservice template',
    environment: 'test',
    namespace: 'microservice-template',
    host: 'localhost',
    description: 'Template to be used for microservices',
    port: 3000
  },
  googleCloudConfig: {
    projectId: 'nemo-dev-266318',
    secrets: {
      nemoDatabase: 'nemoDatabase'
    }
  }
};
