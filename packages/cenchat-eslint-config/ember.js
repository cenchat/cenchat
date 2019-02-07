module.exports = {
  rules: {
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'ember/avoid-leaking-state-in-ember-objects': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
  },
  overrides: [
    // test files
    {
      files: [
        '**/*-test.js',
      ],
      rules: {
        'prefer-arrow-callback': 'off',
      },
    },
  ],
};
