import { ErrorInfo, ErrorResponse } from '../server/models/error';

export interface InterfaceErrorHandlerPlugin {
  getFormattedError(error: ErrorInfo): ErrorResponse;
  throwFormattedError(error: ErrorInfo): void;
}
