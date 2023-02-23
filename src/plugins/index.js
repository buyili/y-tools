import modal from './modal'

export default {
  install(app) {
    // 模态框对象
    app.config.globalProperties.$modal = modal
  }
}
