import { injectable } from 'inversify';
import moment from 'moment';
import uuid from 'uuid';

import { config } from '../config';
import { ErrorInfo, ErrorResponse } from '../server/models/error';

@injectable()
export class ErrorHandlerPlugin {
  private _name!: string;

  public setName(name: string): void {
    this._name = name;
  }

  public getFormattedError(error: ErrorInfo): ErrorResponse {
    try {
      const data = {
        requestId: uuid.v1(),
        timestamp: moment()
          .utc()
          .valueOf(),
        code: `${config.serviceConfig.name}_${this._name}_${error.source}`
          .toUpperCase()
          .replace(/ /g, '_')
      };
      return { ...error, ...data };
    } catch (error) {
      return error;
    }
  }

  public throwFormattedError(error: ErrorInfo): void {
    throw this.getFormattedError(error);
  }
}
