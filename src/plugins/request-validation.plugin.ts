import { transformAndValidate, TransformValidationOptions } from 'class-transformer-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { ValidationError } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { inject, injectable } from 'inversify';

import { RequestWithBody, RequestWithParams } from '../server/models/request-validation';
import { RequestValidationMiddlewareType } from '../server/models/types';
import { InterfaceErrorHandlerPlugin } from './error-handler.interface';
import { InterfaceRequestValidationMiddleware } from './request-validation.interface';

@injectable()
export class RequestValidationMiddleware
  implements InterfaceRequestValidationMiddleware {
  private _error: InterfaceErrorHandlerPlugin;
  constructor(
    @inject(nameof<InterfaceErrorHandlerPlugin>())
    errorFactory: (name: string) => InterfaceErrorHandlerPlugin
  ) {
    this._error = errorFactory(nameof<RequestValidationMiddleware>());
  }

  public validationMiddleware<T extends object>(
    reqOption: RequestValidationMiddlewareType,
    type: ClassType<T>,
    options?: TransformValidationOptions
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction): void => {
      transformAndValidate(
        type,
        reqOption === 'body' ? req.body : { ...req.params, ...req.query },
        options
      )
        .then((validated: T | T[]) => {
          if (reqOption === 'body') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const requestWithBody: RequestWithBody<T | T[]> = req as any;
            requestWithBody.validatedBody = validated;
          } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const requestWithParams: RequestWithParams<T | T[]> = req as any;
            requestWithParams.validatedParams = validated;
          }
          next();
        })
        .catch((errors: ValidationError[]) => {
          if (errors.length) {
            let message = '';
            if (Array.isArray(errors[0])) {
              message = errors
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((e, i) => this._wrapError(e as any, i))
                .join(', ');
            } else {
              message = this._wrapError(errors);
            }
            next(
              this._error.getFormattedError({
                source: 'int',
                status: 400,
                message:
                  reqOption === 'body'
                    ? 'Request body validation failed'
                    : 'Request params validation failed',
                errorData: {
                  message,
                  errors
                }
              })
            );
          } else {
            next();
          }
        });
    };
  }

  private _wrapError(errors: ValidationError[], index?: number): string {
    if (errors.length) {
      let message = errors
        .map((error: ValidationError) => Object.values(error.constraints))
        .join(', ');
      if (typeof index === 'number') {
        message += ` (at top level array index ${index})`;
      }
      return message;
    }
    return '';
  }
}
