const assert = require('assert')
const slice = [].slice;

function fail(err) {
  if (err) throw err;
}

class PluginLaboratory {
  constructor(plugins = []) {
    assert(Array.isArray(plugins), 'plugins should be an array')

    this.plugins = []

    plugins.forEach(this.use.bind(this))
  }

  use(plugin) {
    assert(typeof plugin === 'function', 'plugin should be a function')

    this.plugins.push(plugin)

    return this
  }

  async run() {
    var last = arguments[arguments.length - 1]
    var callback = typeof last == 'function' && last
    var args = callback
      ? slice.call(arguments, 0, arguments.length - 1)
      : slice.call(arguments)

    
    for (const plugin of this.plugins) {
      try {
        const promise = plugin(...args)
        assert(promise && promise.constructor.name === 'Promise', 'plugin did not return a promise')
        await promise
      } catch(err) {
        return (callback || fail)(err)
      }
    }

    if (callback) return callback(null, ...args)

  }
}

module.exports = PluginLaboratory