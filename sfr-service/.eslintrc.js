const RULES = {
    OFF: 'off',
    ERROR: 'error',
    WARN: 'warn',
  };
  
  module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: ['airbnb-base', 'prettier'],
    parserOptions: {
      ecmaVersion: 'latest',
    },
    plugins: ['import', 'prettier'],
    rules: {
      'prettier/prettier': RULES.ERROR,
      'no-underscore-dangle': [RULES.OFF],
      'no-unused-vars': [
        RULES.ERROR,
        { argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
      ],
      'no-console': RULES.OFF,
    },
  };
  