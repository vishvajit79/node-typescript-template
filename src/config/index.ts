import { Config } from '../server/models/config';
import { Environment } from '../server/models/environment';
import { developmentConfig } from './development';
import { localConfig } from './local';
import { productionConfig } from './production';
import { testConfig } from './test';

const getConfig = (): Config => {
  const environment: Environment =
    (process.env.NODE_ENV as Environment) || Environment.DEVELOPMENT;
  if (environment === Environment.PRODUCTION) {
    return productionConfig;
  } else if (environment === Environment.LOCAL) {
    return localConfig;
  } else if (environment === Environment.TEST) {
    return testConfig;
  } else {
    return developmentConfig;
  }
};

export const config = getConfig();
