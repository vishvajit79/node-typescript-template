export interface ErrorInfo {
  status: number;
  message: string;
  source: errorSource;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorData?: { [key: string]: any };
}

export interface ErrorResponse extends ErrorInfo {
  code: string;
  requestId: string;
  timestamp: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stack?: any;
}

export type errorSource = 'int' | 'intapi' | 'intdb' | 'intgcp' | 'extapi';
