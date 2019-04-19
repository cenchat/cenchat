import { helper } from '@ember/component/helper';

/**
 * @param {Array.<string>} values
 * @param {string} values[].value1
 * @param {string} values[].value2
 * @return {string} First value if available. Otherwise, the second value.
 * @function
 */
export function renderOr([value1, value2]) {
  return value1 || value2;
}

export default helper(renderOr);
