import { Config } from '../server/models/config';

export const productionConfig: Config = {
  serviceConfig: {
    name: 'Microservice template',
    environment: 'production',
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
