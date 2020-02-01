import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

import { swaggerSpec } from '../../config/swagger';
import { logger } from '../utils/logger';

@injectable()
export class SwaggerController {
  public async getDocs(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    logger.info('Fetching Swagger API Docs');
    res.json(swaggerSpec);
    logger.info('Done fetching Swagger API Docs');
    next();
  }
}
