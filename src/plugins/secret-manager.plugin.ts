import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { injectable } from 'inversify';

import { config } from '../config';
import { logger } from '../server/utils/logger';
import { InterfaceSecretManagerPlugin } from './secret-manager.interface';

const client = new SecretManagerServiceClient();

const secrets: { [key: string]: string } = {};

@injectable()
export class SecretManagerPlugin implements InterfaceSecretManagerPlugin {
  public async initSecret(key: string): Promise<void> {
    try {
      logger.info(`Initializing secret: ${key} started`);
      const [accessResponse] = await client.accessSecretVersion({
        name: `projects/${config.googleCloudConfig.projectId}/secrets/${config.googleCloudConfig.secrets[key]}/versions/latest`
      });
      const responsePayload: string | null =
        accessResponse && accessResponse.payload && accessResponse.payload.data
          ? accessResponse.payload.data.toString()
          : null;
      if (responsePayload) {
        secrets[key] = responsePayload;
        logger.info(`Initializing secret: ${key} finished`);
      } else {
        logger.error(`Initializing secret: ${key} failed`);
      }
    } catch (error) {
      logger.error(`Error while initializing secret: ${key}`, {
        error,
        secretName: key
      });
    }
  }

  public async getSecretString(key: string): Promise<string | null> {
    logger.info(`Getting secret: ${key} data`);
    if (secrets[key]) {
      logger.info(`Done getting secret: ${key} data`);
      return secrets[key];
    }
    logger.info(`Secret: ${key} not found in the storage. Calling initSecret`);
    await this.initSecret(key);
    logger.info(`Done getting secret: ${key} data`);
    return secrets[key];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async getSecretJson(key: string): Promise<any> {
    const secretString = await this.getSecretString(key);
    try {
      if (secretString) {
        return JSON.parse(secretString);
      }
    } catch (error) {
      logger.error(`Error while parsing secret: ${key} to JSON object`, {
        error,
        secretName: key
      });
    }
    return null;
  }
}
