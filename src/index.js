import NuclearModule from 'nuclear-module'
import { STORE_NAME } from './constants'
import BindingStore from './stores/BindingStore'
import * as actions from './actions'
import * as getters from './getters'

module.exports = NuclearModule({
  stores: {
    [STORE_NAME]: BindingStore,
  },
  actions: actions,
  getters: getters
})
