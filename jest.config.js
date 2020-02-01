module.exports = {
  globals: {
    'ts-jest': {
      tsConfigFile: 'tsconfig.json'
    }
  },
  roots: ['src'],
  moduleFileExtensions: ['ts', 'js', 'node', 'json'],
  transform: {
    '^.+\\.(ts|tsx)$': './test/preprocessor.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  testEnvironment: 'node',
  verbose: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
  collectCoverageFrom: ['src/server/**/*.ts'],
  coveragePathIgnorePatterns: ['src/server/models'],
  notify: true,
  setupFiles: ['./test/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/config/test.ts']
};
