module.exports = {
    transform: {
      '^.+\\.ts?$': 'ts-jest', // Indicates Jest to use ts-jest for TypeScript files
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$', 
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Add 'ts' and 'tsx' to moduleFileExtensions
  };
  