import { TransformValidationOptions } from 'class-transformer-validator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { RequestHandler } from 'express';

import { RequestValidationMiddlewareType } from '../server/models/types';

export interface InterfaceRequestValidationMiddleware {
  validationMiddleware<T extends object>(
    reqOption: RequestValidationMiddlewareType,
    type: ClassType<T>,
    options?: TransformValidationOptions
  ): RequestHandler;
}
