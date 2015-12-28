import { createInterface } from 'simple-interface'

export default createInterface('BindingInterface', {
  key: String,
  shared: Boolean,
  resolver: Function
})

