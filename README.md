# PluginLaboratory

A tiny module to create an asynchronous powered middleware layer.

## Why?
Don't modules like ware already solve this?
In some cases, yes. But i have a preference over promises.

- This has no dependencies.
- Its smaller.
- Uses ES5 Classes, so it can easily be extended.

## Usage

```js
const lab = new PluginLab()
  .use(async (arg) => arg.foo = true)
  .use(async (arg) => arg.baz = 'booze')
  .run({ foo: false }, (output) => {
    console.log(output) // { foo: true, baz: 'booze }
  })
```

## Api

#### new PluginLaboratory()

Create a new lab

#### .use(AsyncFunction)

Push a function onto the plugin stack. This function should always return a promise.

#### .run(...arguments, callback)

Process the input trough the functions. Callback will be called when it is finished.

Returns a promise.

