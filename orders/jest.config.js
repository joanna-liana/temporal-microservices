module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/tests/.*\\.(test|spec))\\.ts?$',
  testEnvironment: 'node',
  rootDir: '.',
  collectCoverageFrom: ['**/*.ts', '!demo.ts'],
};
