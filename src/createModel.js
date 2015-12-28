import map from 'lodash.mapvalues'
import { Record } from 'immutable'

/**
 * Creates an immutable record instance from given simple interface instance.
 *
 * Example:
 *     Turns
 *         {
 *           key: String,
 *           shared: Boolean,
 *           resolver: Function
 *         }
 *     to
 *         {
 *           key: '',
 *           shared: false,
 *           resolver: () => {}
 *         }
 *
 * @public
 * @param {SimpleInterface} interface
 * @returns {immutable.Record}
 */
export default function createModel(_interface) {
  const contract = _interface.getContract()

  const description = map(contract, (Factory, key) => Factory())

  return Record(description)
}
