import test from 'ava'

const PluginLab = require('./index.js')

test('Should return the lab', async t => {
  t.truthy(PluginLab)
})

test('Lab should be constructable and instance of lab', async t => {
  const lab = new PluginLab()

  t.true(lab instanceof PluginLab)
})

test('New lab should have no plugins', async t => {
  const lab = new PluginLab()

  t.deepEqual(lab.plugins, [])
})

test('Plugins can be added when constructing', async t => {
  const lab = new PluginLab([async () => {}])

  t.is(lab.plugins.length, 1)
})

test('Plugins can be added with .use', async t => {
  const lab = new PluginLab()
    .use(async () => {})
  
  t.is(lab.plugins.length, 1)
})

test('Argument should change', async t => {
  var input = { foo: false }
  var output = { foo: true, baz: 'booze' }

  const lab = new PluginLab()
    .use(async (arg) => arg.foo = true)
    .use(async (arg) => arg.baz = 'booze')
  
  await lab.run(input)

  t.deepEqual(input, output)
})