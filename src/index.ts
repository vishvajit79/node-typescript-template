// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/ts-nameof/ts-nameof.d.ts" />
import './bluebird';
import 'express-async-errors';
import 'reflect-metadata';

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { config } from './config';
import { swaggerSpec } from './config/swagger';
import { appContainer } from './inversify.config';
import { PluginManager } from './plugins.config';
import { routes } from './routes';
import { errorMiddleware } from './server/middlewares/error.middleware';
import { logger, loggerStream } from './server/utils/logger';

const app = express();
app.use(morgan('combined', { stream: loggerStream }));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }'
  })
);
app.use('/', routes);
app.use(errorMiddleware);

(async (): Promise<void> => {
  const pluginManger = appContainer.get<PluginManager>(nameof<PluginManager>());
  // Initialize all plugins
  await pluginManger.initalizePlugin();

  // Start the server
  app.listen(config.serviceConfig.port, () => {
    logger.info(`Server running on port ${config.serviceConfig.port}`);
  });
})();
