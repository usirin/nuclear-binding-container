import NuclearModule from 'nuclear-module'
import * as actions from './actions'
import EntityCacheStore from './stores/EntityCacheStore'

const cacheStoreName = '@@entity-cache/EntityCacheStore'

module.exports = NuclearModule({
  stores: {
    [cacheStoreName]: EntityCacheStore
  },
  actions: actions,
  getters: {
    byId(name, id) {
      return [cacheStoreName, name, id]
    }
  }
})
