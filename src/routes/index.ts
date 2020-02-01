import { Router } from 'express';

import { appContainer } from '../inversify.config';
import { InterfaceRequestValidationMiddleware } from '../plugins/request-validation.interface';
import { ExampleController } from '../server/controllers/example.controller';
import { HealthController } from '../server/controllers/health.controller';
import { SwaggerController } from '../server/controllers/swagger.controller';
import { ExampleBody, ExampleParams } from '../server/models/example';

const routes = Router();

const requestValidationMiddleware = appContainer.get<
  InterfaceRequestValidationMiddleware
>(nameof<InterfaceRequestValidationMiddleware>());

const validationMiddleware = requestValidationMiddleware.validationMiddleware.bind(
  requestValidationMiddleware
);

const swaggerController = appContainer.get<SwaggerController>(
  nameof<SwaggerController>()
);
const healthController = appContainer.get<HealthController>(
  nameof<HealthController>()
);
const exampleController = appContainer.get<ExampleController>(
  nameof<ExampleController>()
);

routes.get('/', healthController.getHealth.bind(healthController));

routes.get('/health', healthController.getHealth.bind(healthController));

/**
 * @swagger
 * /example:
 *  post:
 *    description: Test the request validation and transform from class-validator
 *    summary: Returns class transform validation params and body
 *    tags: [Example]
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: source
 *        description: Random string
 *        required: true
 *        in: query
 *        type: string
 *      - name: example
 *        description: Random string
 *        required: false
 *        type: string
 *        in: query
 *      - name: body
 *        description: Body required
 *        required: true
 *        in: body
 *        schema:
 *          $ref: '#/definitions/ExampleBody'
 *    responses:
 *      200:
 *        description: Returns validated and transformed params and body
 *        schema:
 *          $ref: '#/definitions/ExampleResponse'
 *      default:
 *        description: Error response
 *        schema:
 *          $ref: '#/definitions/ErrorResponse'
 */
routes.post(
  '/example',
  [
    validationMiddleware('params', ExampleParams, {
      validator: { groups: ['group1'] }
    }),
    validationMiddleware('body', ExampleBody, {
      validator: { groups: ['group2'] }
    })
  ],
  exampleController.checkValidation.bind(exampleController)
);

routes.get('/api', swaggerController.getDocs.bind(swaggerController));

export { routes };
