/* eslint node/no-extraneous-require: off */

'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');
const cssimport = require('postcss-import');
const cssnext = require('postcss-cssnext');

module.exports = function (defaults) {
  const trees = {};

  if (EmberApp.env() === 'production') {
    trees.app = new Funnel('app', {
      exclude: ['**/*-test.js'],
    });
  }

  const app = new EmberApp(defaults, {
    trees,
    fingerprint: {
      exclude: ['universal.js', 'wordpress.js'],
    },
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [{ module: cssimport }],
      },
      filter: {
        enabled: true,
        plugins: [
          {
            module: cssnext,
            options: {
              features: { customProperties: false },
            },
          },
        ],
      },
    },
    stylelint: {
      linterConfig: { syntax: 'css' },
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
