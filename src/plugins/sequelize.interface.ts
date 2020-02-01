import { SequelizeOptions } from 'sequelize-typescript';

export interface InterfaceSequelizePlugin {
  makeConnection(options: SequelizeOptions): Promise<void>;
}
