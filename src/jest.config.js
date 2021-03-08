const esModules = ['@agm', 'gsap'].join('|');

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.ts',
    '!**/src/*',
    '!**/src/**/*.module.ts',
    '!**/src/shared/**/index.ts',
    '!**/src/main.ts',
    '!**/assets/**',
    '!**/src/environments/**',
    '!**/src/app/shared/models/**',
    '!**/src/app/shared/enums/**',
    '!**/src/test-base-ext/**'
  ],
  coverageDirectory: 'coverage',
  globals: {
    'ts-jest': {
      stringifyContentPathRegex: '\\.html$',
      tsconfig: '<rootDir>/tsconfig.spec.json'
    }
  },
  reporters: [
    "default",
    [
      "jest-trx-results-processor",
      {
        "outputFile": "results.trx"
      }
    ]
  ],
  moduleDirectories: ['<rootDir>/node_modules', '<rootDir>/src'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFiles: ['jest-date-mock'],
  setupFilesAfterEnv: ['<rootDir>/src/setupJest.ts'],
  testMatch: ['**/*.spec.ts'],
  testURL: 'http://localhost',
  testPathIgnorePatterns: ['<rootDir>/src/environments/environment.dev.ts'],
  transform: { '^.+\\.ts?$': 'ts-jest' },
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  verbose: true
};
