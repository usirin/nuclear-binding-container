import { Map } from 'immutable'
import createModel from '../createModel'
import BindingInterface from '../interfaces/BindingInterface'
import { ADD } from '../actionTypes'

/**
 * Model class of one Binding.
 */
export const Model = createModel(BindingInterface)

export default {
  getInitialState() {
    return Map({})
  },
  handlers: [
    {
      type: ADD,
      handler: addBinding
    },
  ]
}

/**
 * Convert given payload to a new model and add it to the store.
 *
 * @public
 * @param {Immutable.Map} bindings
 * @param {object} payload
 * @param {string} payload.key
 * @param {boolean} payload.shared
 * @param {function} payload.resolver
 * @returns {Immutable.Map} new bindings
 */
function addBinding(bindings, { key, shared, resolver }) {
  const binding = new Model({ key, shared, resolver })
  return bindings.set(key, binding)
}

