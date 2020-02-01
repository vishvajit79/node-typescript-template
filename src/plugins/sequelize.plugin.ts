import { inject, injectable } from 'inversify';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import { SecretKeys } from '../server/models/secrets';
import { SequelizeSecret } from '../server/models/sequelize';
import { logger } from '../server/utils/logger';
import { InterfaceSecretManagerPlugin } from './secret-manager.interface';
import { InterfaceSequelizePlugin } from './sequelize.interface';

@injectable()
export class SequelizePlugin implements InterfaceSequelizePlugin {
  constructor(
    @inject(nameof<InterfaceSecretManagerPlugin>())
    private _secretManagerPlugin: InterfaceSecretManagerPlugin
  ) {}
  public async makeConnection(options: SequelizeOptions): Promise<void> {
    const sequelizeSecret: SequelizeSecret = await this._secretManagerPlugin.getSecretJson(
      SecretKeys.nemoDatabase
    );
    const sequelize = new Sequelize({
      database: sequelizeSecret.database,
      username: sequelizeSecret.username,
      password: sequelizeSecret.password,
      host: sequelizeSecret.host,
      dialect: sequelizeSecret.dialect,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      logging: options.logging ? options.logging : msg => logger.debug(msg),
      models: options.models
    });

    try {
      logger.info('Making connection to the database', { options });
      await sequelize.sync();
      logger.info('Successfully connected to the database', { options });
    } catch (error) {
      logger.error('Unable to connect to the database', { error });
    }
  }
}
