import { STORE_NAME } from './constants'

/**
 * Returns the getter for given key.
 *
 * @public
 * @param {string} key - binding key
 * @returns {Getter}
 */
export function binding(key) {
  return [STORE_NAME, key]
}
