import expect from 'expect'
import { Reactor } from 'nuclear-js'
import { STORE_NAME } from '../src/constants'

import BindingContainer, { getters } from '../src'

let reactor = new Reactor

describe('BindingContainer', () => {
  afterEach(() => {
    reactor.reset()
  })

  describe('actions.bind', () => {
    it('adds a binding', () => {
      const { actions } = BindingContainer(reactor)
      actions.bind('foo', false, () => 'bar')

      const binding = reactor.evaluate(getters.binding('foo'))

      expect(binding.resolver()).toBe('bar')
    })
  })

  describe('actions.bindIf', () => {
    it('should bind only if it did not bind before', () => {
      const { actions } = BindingContainer(reactor)
      actions.bindIf('foo', false, () => 'bar')
      actions.bindIf('foo', false, () => 'baz')

      const binding = reactor.evaluate(getters.binding('foo'))

      expect(binding.resolver()).toBe('bar')
    })
  })

  describe('actions.singleton', () => {
    it('should bind a shared binding', () => {
      const { actions } = BindingContainer(reactor)
      actions.singleton('foo', () => 'bar')

      const binding = reactor.evaluate(getters.binding('foo'))

      expect(binding.shared).toBe(true)
    })
  })
})
