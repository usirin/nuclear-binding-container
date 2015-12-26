import invariant from 'invariant'
import isObject from 'lodash.isobject'
import EntityInterface from './interfaces/EntityInterface'
import { ENTITY_CACHE_LOAD, ENTITY_CACHE_REMOVE } from './actionTypes'

/**
 * Action to cache entity data.
 *
 * @public
 * @param {Nuclear.Reactor} reactor
 * @param {string} entityName
 * @param {object|array} data
 */
export function load(reactor, entityName, data) {

  invariant(
    entityName,
    `EntityCache.actions.load: expected an entity name provided.`
  )

  if (!Array.isArray(data)) {
    data = [data]
  }

  data.forEach(entity => {
    invariant(
      EntityInterface.isInstance(entity),
      `EntityCache.actions.load: expected entity like to satisfy ${EntityInterface.toString()}; got %s instead`,
      entity.constructor.name
    )
  })

  reactor.dispatch(ENTITY_CACHE_LOAD, {
    name: entityName,
    data: data
  })
}

/**
 * Action to remove entities.
 *
 * @public
 * @param {Nuclear.Reactor} reactor
 * @param {string} entityName
 * @param {array} selectors
 * @returns {Immutable.Map}
 */
export function remove(reactor, entityName, selectors) {
  invariant(
    entityName,
    `EntityCache.actions.remove: expected an entity name provided.`
  )

  if (!Array.isArray(selectors)) {
    selectors = [selectors]
  }

  reactor.dispatch(ENTITY_CACHE_REMOVE, {
    entityName, selectors
  })
}
