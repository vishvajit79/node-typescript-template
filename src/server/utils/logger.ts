import { LoggingWinston } from '@google-cloud/logging-winston';
import path = require('path');
import { createLogger, format, transports } from 'winston';

import { Environment } from '../models/environment';

const { label, combine, timestamp, prettyPrint, metadata } = format;

const googleCloudLogging = new LoggingWinston();

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: combine(
    label({ label: path.basename(process.mainModule?.filename || '') }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    prettyPrint(),
    metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.splat(),
        format.json(),
        format.prettyPrint()
      )
    }),
    process.env.NODE_ENV === Environment.DEVELOPMENT ||
    process.env.NODE_ENV === Environment.PRODUCTION
      ? googleCloudLogging
      : new transports.File({
          filename: 'logs/combined.log',
          format: format.combine(
            // Render in one line in your log file.
            // If you use prettyPrint() here it will be really
            // difficult to exploit your logs files afterwards.
            format.splat(),
            format.json(),
            format.prettyPrint()
          )
        })
  ],
  exitOnError: false
});

const loggerStream = {
  write: (message: string): void => {
    logger.info(message);
  }
};

export { logger, loggerStream };
