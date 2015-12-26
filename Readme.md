# nuclear-entity-cache

Store formatted data in a centeralized cache. Inspired by the `rest-api-cache` example from `nuclear-js` github repo.

### What?

Assume that you have structured data, mostly backend models.

```js
// modules/api/actions.js

import Api from 'path/to/api'

import {
  API_FETCH_BEGIN,
  API_FETCH_SUCCESS
} from './actionTypes'

export default function fetch(reactor, name, id) {
  reactor.dispatch(API_FETCH_BEGIN, { id, name })

  Api.fetch(id)
    .then(result => {
      reactor.dispatch(API_FETCH_SUCCESS, { id, name, result })
    })
}
```

And you would have a store to listen those dispatches, and bind handlers to it.

```js
// modules/api/stores/api-cache-store.js

export default {
  getInitialState() {
    return toImmutable({})
  },
  handlers: [
    {
      type: API_FETCH_SUCCESS,
      handler(cache, { id, name, result }) {
        if (!cache.has(name)) {
          cache = cache.set(name, toImmutable({}))
        }
        return cache.setIn([name, id], toImmutable(result))
      }
    }
  ]
}
```

Most of the time this is well enough solution if you are dealing with only one backend,
but once you start to use different services/resources you need to create another module,
and connect the data in `getter` level.

`nuclear-entity-cache` tries to solve this problem by providing a very simple cache layer
module that can be used with arbitrary entity types.

Let's rewrite the example to utilize `nuclear-entity-cache`


```js
// modules/api/actions.js

import Api from 'path/to/api'

import EntityCache from 'nuclear-entity-cache'

export default function fetch(reactor, type, id) {
  // get entity-cache actions by registering your reactor.
  let { actions } = EntityCache(reactor)

  Api.fetch(id)
    .then(result => {
      // replace your individual action call with EntityCache actions.
      // IMPORTANT: result needs to have an `id` field.
      actions.load(type, result)
    })
}
```

That's it. One thing you have to remember is that the result you want to load has to have an `id`.
Now you can use exported `byId` getter to read your data.

```js
// src/app.js

import ApiModule from '../modules/api'
import EntityCache, { getters } from 'nuclear-entity-cache'

let reactor = new Nuclear.Reactor

const { actions } = ApiModule(reactor)

actions.fetch('user', '1')

// in some other part of the system following getter got triggered by change handlers.
getters.byId('user', '1') // that's why you need an id.
```

# install

```
npm install nuclear-entity-cache
```

# licence

MIT
