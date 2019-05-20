import { helper } from '@ember/component/helper';

/**
 * @param {string[]} args
 * @return {string} Decoded value
 * @function
 */
export function decode([value]) {
  return decodeURIComponent(value);
}

/**
 * @function
 */
export default helper(decode);
