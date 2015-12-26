import expect from 'expect'
import { Reactor } from 'nuclear-js'

import EntityCache from '../src'

let reactor = new Reactor

describe('NuclearEntityCache', () => {
  afterEach(() => {
    reactor.reset()
  })

  describe('actions', () => {
    describe('load', () => {
      it('should throw when there is no entity name', () => {
        let cache = EntityCache(reactor)

        expect(() => {
          cache.actions.load()
        }).toThrow(/expected an entity name provided/)
      })

      it('should throw when given object does not satisfy EntityInterface', () => {
        let notAllowedEntities = [
          'foo', 1, '', true, false
        ]

        let cache = EntityCache(reactor)

        notAllowedEntities.forEach(entityLike => {
          expect(() => {
            cache.actions.load('foo', entityLike)
          }).toThrow(/expected entity like to satisfy EntityInterface/)
        })
      })

      it('should load entity', () => {
        let data = {
          id: '1',
          name: 'foo'
        }

        let cache = EntityCache(reactor)
        cache.actions.load('user', data)

        let user = reactor.evaluate(EntityCache.getters.byId('user', '1'))

        expect(user.get('name')).toBe('foo')
      })

      it('should load multiple entities', () => {
        let data = [
          {id: '1', name: 'Jane'},
          {id: '2', name: 'John'}
        ]

        let cache = EntityCache(reactor)
        cache.actions.load('user', data)

        let jane = reactor.evaluate(EntityCache.getters.byId('user', '1'))
        let john = reactor.evaluate(EntityCache.getters.byId('user', '2'))

        expect(jane.get('name')).toBe('Jane')
        expect(john.get('name')).toBe('John')
      })
    })

    describe('remove', () => {
      it('removes entity', () => {
        let data = [
          {id: '1', name: 'Jane'},
          {id: '2', name: 'John'}
        ]

        let cache = EntityCache(reactor)
        cache.actions.load('user', data)

        let jane = reactor.evaluate(EntityCache.getters.byId('user', '1'))

        expect(jane.get('name')).toBe('Jane')

        cache.actions.remove('user', { id: '1' })

        jane = reactor.evaluate(EntityCache.getters.byId('user', '1'))

        expect(jane).toNotExist()

      })

      it('should remove multiple', () => {
        let data = [
          {id: '1', name: 'Jane'},
          {id: '2', name: 'John'}
        ]

        let cache = EntityCache(reactor)
        cache.actions.load('user', data)

        let jane = reactor.evaluate(EntityCache.getters.byId('user', '1'))

        expect(jane.get('name')).toBe('Jane')

        cache.actions.remove('user', [{ id: '1' }, {id: '2'}])

        jane = reactor.evaluate(EntityCache.getters.byId('user', '1'))

        expect(jane).toNotExist()
      })
    })
  })
})
