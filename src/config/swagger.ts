import swaggerJsdoc from 'swagger-jsdoc';

import { config } from '.';

const HOST = config.serviceConfig.host;

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
const swaggerDefinition = {
  info: {
    // API informations (required)
    title: config.serviceConfig.name, // Title (required)
    version: '1.0.0', // Version (required)
    description: config.serviceConfig.description // Description (optional)
  },
  host: `${HOST}`, // Host (optional)
  basePath: '/', // Base path (optional)
  schemes: ['https', 'http']
};

// Options for the swagger docs
const options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  // Note that this path is relative to the current directory from which the Node.js is ran,
  // not the application itself.
  apis: ['dist/routes/*', 'swagger/*']
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
export const swaggerSpec = swaggerJsdoc(options);
