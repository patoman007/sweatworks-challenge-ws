module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/*.+(ts)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
};
