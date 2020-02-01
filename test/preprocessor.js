const nameof = require('ts-nameof');
const tsJest = require('ts-jest/preprocessor');
Object.defineProperty(exports, "__esModule", { value: true });

function process(src, filename, config, options) {
  const replaceResult = nameof.replaceInText(src);
  if (replaceResult.replaced)
    return tsJest.process(replaceResult.fileText, filename, config, options);
  return tsJest.process(src, filename, config, options);
}

exports.getCacheKey = tsJest.getCacheKey;
exports.process = process;
