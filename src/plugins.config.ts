import { inject, injectable } from 'inversify';
import { SequelizeOptions } from 'sequelize-typescript';

import { config } from './config';
import { InterfaceSecretManagerPlugin } from './plugins/secret-manager.interface';
import { InterfaceSequelizePlugin } from './plugins/sequelize.interface';
import { logger } from './server/utils/logger';

@injectable()
export class PluginManager {
  constructor(
    @inject(nameof<InterfaceSecretManagerPlugin>())
    private _secretManagerPlugin: InterfaceSecretManagerPlugin,
    @inject(nameof<InterfaceSequelizePlugin>())
    private _sequelizePlugin: InterfaceSequelizePlugin
  ) {}
  public async initalizePlugin(): Promise<void> {
    const secrets = config.googleCloudConfig.secrets;
    if (secrets && Object.keys(secrets).length) {
      const secretsPromises: Promise<void>[] = [];
      Object.keys(secrets).forEach(key => {
        secretsPromises.push(this._secretManagerPlugin.initSecret(key));
      });
      await Promise.all(secretsPromises);
    }

    const options: SequelizeOptions = {
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      logging: (msg: string) => logger.debug(msg),
      models: []
    };
    await this._sequelizePlugin.makeConnection(options);
  }
}
