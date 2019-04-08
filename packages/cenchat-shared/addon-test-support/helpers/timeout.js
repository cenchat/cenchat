import { later } from '@ember/runloop';
import { settled } from '@ember/test-helpers';

/**
 * @param {number} value
 * @return {Promise}
 */
export default function timeout(value) {
  later(() => {}, value);

  return settled();
}
