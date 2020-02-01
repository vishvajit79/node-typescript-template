// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../node_modules/ts-nameof/ts-nameof.d.ts" />
import 'reflect-metadata';

import Bluebird from 'bluebird';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.Promise = Bluebird.Promise as any;

jest.mock('request-promise-native');
