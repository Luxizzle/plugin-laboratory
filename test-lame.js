const PluginLab = require('./index.js')

var lab = new PluginLab()

lab
  .use(async function() {
    console.log('plugin 1')
  })
  .use(function() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log('plugin 2')
        resolve()
      }, 100)
    })
  })

  .use(() => {})
  .use(async () => {
    console.log('plugin 3')
  })
  .run()
    .then(() => {
      console.log('done')
    })
    .catch((err) => {
      console.error(err)
    })