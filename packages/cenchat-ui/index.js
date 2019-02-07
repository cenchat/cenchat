'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  treeForVendor(defaultTree) {
    const importPrefix = this.project.pkg.name === this.name ? '' : `node_modules/${this.name}/`;
    const browserVendorLib = new Funnel(`${importPrefix}node_modules`, {
      destDir: 'funnel',
      files: ['normalize.css/normalize.css'],
    });

    return new MergeTrees([defaultTree, browserVendorLib]);
  },

  included(app) {
    this._super.included.apply(this, arguments);

    app.import('vendor/funnel/normalize.css/normalize.css');
  },
};
