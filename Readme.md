# nuclear-entity-cache

A binding registry to be used within a nuclear app to register `resolver` functions for specific keys.

### What?

This module is designed to be used in conjuction with other modules to compose bigger modules.
Highly inspired by the `ServiceContainer` from `laravel/framework`.

Assume that you want to bind an instance to a container and use it within other parts of a system.

We have 2 different types of bindings: `shared` and `non-shared`: `shared` bindings are registered to container with `shared` property set to `true`.
Even though this doesn't have any effect on anything, any other module that consumes `BindingContainer` module, will have access to this property.

We have 3 actions:

```js
// your/app/app.js
const reactor = new Nuclear.Reactor
const bindingContainer = BindingContainer(reactor)

// this will register the binding with shared property set to 'false'
// that can be later used to initate a `Foo` instance.
bindingContainer.actions.bind('Foo', false, () => new Foo)

// this will register the binding only if there is no other binding under this
// name. It is not a `shared` binding, so second parameter is `false` again. It
// mirrors `bind` action's api.
bindingContainer.actions.bindIf('Foo', false, () => new Foo)

// we can register a shared binding either using `bind` action by passing `true`
// as second parameter to denote that it will be shared, or we can use `singleton`
// action to achieve the same purpose.
bindingContainer.actions.bind('Foo', true, () => new Foo)
bindingContainer.actions.singleton('Foo', () => new Foo) // this is identical to the line above.

// later on we can read a binding using exported `binding` getter.
const binding = reactor.evaluate(bindingContainer.getters.binding('Foo'))
console.log(binding.resolve()) // shows a `Foo` instance.
```

# install

```
npm install nuclear-binding-container
```

# licence

MIT
