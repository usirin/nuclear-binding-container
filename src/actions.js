import { ADD } from './actionTypes'
import { binding } from './getters'

/**
 * Register a binding with the container.
 *
 * @public
 * @param {Nuclear.Reactor} reactor
 * @param {string} key
 * @param {boolean} shared
 * @param {function} resolver
 */
export function bind(reactor, key, shared, resolver) {
  reactor.dispatch(ADD, { key, shared, resolver })
}

/**
 * Register a binding if it is not in the container.
 *
 * @public
 * @param {Nuclear.Reactor} reactor
 * @param {string} key
 * @param {boolean} shared
 * @param {function} resolver
 */
export function bindIf(reactor, key, shared, resolver) {
  if ( reactor.evaluate(binding(key)) ) {
    return
  }

  bind(reactor, key, shared, resolver)
}

/**
 * Register a shared binding in the container.
 *
 * @public
 * @param {Nuclear.Reactor} reactor
 * @param {string} key
 * @param {function} resolver
 */
export function singleton(reactor, key, resolver) {
  bind(reactor, key, true, resolver)
}
