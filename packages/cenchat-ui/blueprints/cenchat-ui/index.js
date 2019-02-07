'use strict';

module.exports = {
  afterInstall() {
    return this.addPackagesToProject([
      { name: '@fortawesome/free-solid-svg-icons' },
      { name: 'normalize.css' },
    ]);
  },
};
