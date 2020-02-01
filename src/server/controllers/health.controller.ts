import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import moment from 'moment';

import { config } from '../../config';
import { InterfaceErrorHandlerPlugin } from '../../plugins/error-handler.interface';
import { logger } from '../utils/logger';

@injectable()
export class HealthController {
  private _error: InterfaceErrorHandlerPlugin;
  constructor(
    @inject(nameof<InterfaceErrorHandlerPlugin>())
    errorFactory: (name: string) => InterfaceErrorHandlerPlugin
  ) {
    this._error = errorFactory(nameof<HealthController>());
  }
  public async getHealth(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      logger.info('Checking service health');
      const data = {
        service: config.serviceConfig.name,
        uptime: process.uptime(),
        message: 'OK',
        env: config.serviceConfig.environment,
        timestamp: moment.utc()
      };
      res.json(data);
      logger.info('Done checking service health', { data });
      next();
    } catch (error) {
      this._error.throwFormattedError({
        status: 400,
        message: 'Error while checking service health',
        source: 'int',
        errorData: {
          error
        }
      });
    }
  }
}
