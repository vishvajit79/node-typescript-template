import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { InterfaceErrorHandlerPlugin } from '../../plugins/error-handler.interface';
import { ExampleBody, ExampleParams } from '../models/example';
import { RequestWithBody, RequestWithParams } from '../models/request-validation';
import { logger } from '../utils/logger';

@injectable()
export class ExampleController {
  private _error: InterfaceErrorHandlerPlugin;
  constructor(
    @inject(nameof<InterfaceErrorHandlerPlugin>())
    errorFactory: (name: string) => InterfaceErrorHandlerPlugin
  ) {
    this._error = errorFactory(nameof<ExampleController>());
  }
  public async checkValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const request = req as RequestWithParams<ExampleParams> &
        RequestWithBody<ExampleBody>;
      logger.info('Getting transformed params and body');
      const data = {
        reqParams: request.validatedParams,
        reqBody: request.validatedBody
      };
      res.json(data);
      logger.info('Done getting transformed params and body', { data });
      next();
    } catch (error) {
      this._error.throwFormattedError({
        status: 400,
        message: 'Error while getting transformed params and body',
        source: 'int',
        errorData: {
          error
        }
      });
    }
  }
}
