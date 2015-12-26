import { toImmutable } from 'nuclear-js'
import { ENTITY_CACHE_LOAD, ENTITY_CACHE_REMOVE } from '../actionTypes'

export default {
  getInitialState() {
    return toImmutable({})
  },
  handlers: [
    {
      type: ENTITY_CACHE_LOAD,
      handler: loadHandler
    },
    {
      type: ENTITY_CACHE_REMOVE,
      handler: removeHandler
    }
  ]
}

/**
 * Handler for loading entities.
 *
 * @public
 * @param {Immutable.Map} cache
 * @param {array} payload.data
 * @param {string} payload.entityName
 * @returns {Immutable.Map}
 */
function loadHandler(cache, { name, data }) {
  cache = ensureEntityContainer(cache, name)

  return cache.withMutations(cache => {
    data.forEach(entity => {
      cache.setIn([name, entity.id], toImmutable(entity))
    })
  })
}

/**
 * Handler for removing entities.
 *
 * @public
 * @param {Immutable.Map} cache
 * @param {array} payload.selectors
 * @param {string} payload.entityName
 * @returns {Immutable.Map}
 */
function removeHandler(cache, { entityName, selectors }) {
  cache = ensureEntityContainer(cache, entityName)

  return cache.withMutations(cache => {
    selectors.forEach(({ id }) => {
      cache.removeIn([entityName, id])
    })
  })
}

/**
 * Ensures cache has a container map for given entity.
 *
 * @public
 * @param {Immutable.Map} cache - store state
 * @param {name} name
 * @return {Immutable.Map}
 */
function ensureEntityContainer(cache, name) {
  if(!cache.has(name)) {
    cache = cache.set(name, toImmutable({}))
  }

  return cache
}
