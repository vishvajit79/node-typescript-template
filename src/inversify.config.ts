import { Container, interfaces } from 'inversify';

import { PluginManager } from './plugins.config';
import { InterfaceErrorHandlerPlugin } from './plugins/error-handler.interface';
import { ErrorHandlerPlugin } from './plugins/error-handler.plugin';
import { InterfaceRequestValidationMiddleware } from './plugins/request-validation.interface';
import { RequestValidationMiddleware } from './plugins/request-validation.plugin';
import { InterfaceSecretManagerPlugin } from './plugins/secret-manager.interface';
import { SecretManagerPlugin } from './plugins/secret-manager.plugin';
import { InterfaceSequelizePlugin } from './plugins/sequelize.interface';
import { SequelizePlugin } from './plugins/sequelize.plugin';
import { ExampleController } from './server/controllers/example.controller';
import { HealthController } from './server/controllers/health.controller';
import { SwaggerController } from './server/controllers/swagger.controller';
import { SYMBOLS } from './server/models/error-symbol';

const appContainer = new Container();
appContainer
  .bind<PluginManager>(nameof<PluginManager>())
  .to(PluginManager)
  .inSingletonScope();
appContainer
  .bind<InterfaceErrorHandlerPlugin>(nameof<InterfaceErrorHandlerPlugin>())
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  .toFactory<InterfaceErrorHandlerPlugin>((context: interfaces.Context) => {
    return (name: string): ErrorHandlerPlugin => {
      name = name || 'UNKNOWN';
      const service = appContainer.get<ErrorHandlerPlugin>(
        SYMBOLS.DiagnosticsInstance
      );
      service.setName(name);
      return service;
    };
  });
appContainer
  .bind<InterfaceErrorHandlerPlugin>(SYMBOLS.DiagnosticsInstance)
  .to(ErrorHandlerPlugin)
  .inTransientScope();
appContainer
  .bind<InterfaceRequestValidationMiddleware>(
    nameof<InterfaceRequestValidationMiddleware>()
  )
  .to(RequestValidationMiddleware)
  .inTransientScope();
appContainer
  .bind<SwaggerController>(nameof<SwaggerController>())
  .to(SwaggerController);
appContainer
  .bind<HealthController>(nameof<HealthController>())
  .to(HealthController);
appContainer
  .bind<ExampleController>(nameof<ExampleController>())
  .to(ExampleController);
appContainer
  .bind<InterfaceSecretManagerPlugin>(nameof<InterfaceSecretManagerPlugin>())
  .to(SecretManagerPlugin)
  .inSingletonScope();
appContainer
  .bind<InterfaceSequelizePlugin>(nameof<InterfaceSequelizePlugin>())
  .to(SequelizePlugin)
  .inSingletonScope();
export { appContainer };
