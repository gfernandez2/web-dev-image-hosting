module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest',
    }
};
  