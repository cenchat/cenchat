module.exports = {
  extends: ['airbnb-base'],
  rules: {
    'linebreak-style': 'off',
    'require-jsdoc': [
      'error',
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: true,
        },
      },
    ],
    'valid-jsdoc': [
      'error',
      {
        requireParamDescription: false,
        requireReturnDescription: false,
        requireReturn: false,
        prefer: { returns: 'return' },
      },
    ],
  },
  overrides: [
    // test files
    {
      files: [
        '**/*-test.js'
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
};
