import clipboard from './module/clipboard'

const install = function(app) {
  app.directive('clipboard', clipboard)
}

if (window.Vue) {
  console.log(".......................")
  Vue.use(install); // eslint-disable-line
}

export default install
