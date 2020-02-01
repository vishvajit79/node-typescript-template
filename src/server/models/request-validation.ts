import { Request } from 'express';

export interface RequestWithBody<T> extends Request {
  /**
   * A request that uses the ValidateBodyMiddleware will have this
   * property set to a class-based object of the validated type.
   */
  validatedBody: T;
}

export interface RequestWithParams<T> extends Request {
  /**
   * A request that uses the ValidateParamsMiddleware will have this
   * property set to a class-based object of the validated type with query and
   * path params copied to it
   */
  validatedParams: T;
}
