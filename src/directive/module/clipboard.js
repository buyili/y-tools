/**
 * v-clipboard 文字复制剪贴
 * Copyright (c) 2021 ruoyi
 */

import Clipboard from 'clipboard'
import modal from '../../plugins/modal.js'

/**
 * @description 给节点添加类
 * @param {Element} node dom节点
 * @param {String} className 即将添加的类名
 */
function addClass(node, className){
  var addClassName = trim(className);
  var oriClassName = node.className;
  if(oriClassName.indexOf(addClassName)===-1){
    node.className = oriClassName+ ' ' +className;
  }
}

/**
 * @description 删除字符串首尾空格
 * @param {String} str 原始字符串
 * @return {String} 删除了首位空格后的字符串
 * @example trim('   hello world ') === 'hello world'
 */
function trim(str){
  return str.replace(/^\s+/, '').replace(/\s+$/, '');
}

/**
 * @param {Object} e 结构：{"action":"copy","text":"EOOIUXH02216078","trigger":{"_vClipBoard":{"container":{},"listener":{},"e":{"success":[{}],"error":[{}]}}}}
 * @description 默认复制成功回调方法
 * @private
 */
function _default_clipboard_success(e) {
  modal.msgSuccess("复制成功: " + e.text)
}

/**
 * @desc 默认复制失败回调方法
 * @private
 */
function _default_clipboard_error() {
  modal.msgError('复制失败')
}

export default {
  beforeMount(el, binding, vnode) {
    console.log(vnode)
    addClass(el, 'my-clipboard')
    el.setAttribute('title', '点击复制')
    let iconEle = document.createElement('i')
    iconEle.className = 'el-icon-copy-document'
    iconEle.style = 'padding-left: 3px;'
    el.appendChild(iconEle)
    el.style.cursor = 'pointer'
    switch (binding.arg) {
      case 'success':
        el._vClipBoard_success = binding.value || _default_clipboard_success;
        break;
      case 'error':
        el._vClipBoard_error = binding.value || _default_clipboard_error;
        break;
      default: {
        const clipboard = new Clipboard(el, {
          text: () => binding.value,
          action: () => binding.arg === 'cut' ? 'cut' : 'copy'
        });
        clipboard.on('success', e => {
          const callback = el._vClipBoard_success || _default_clipboard_success;
          callback && callback(e);
        });
        clipboard.on('error', e => {
          const callback = el._vClipBoard_error || _default_clipboard_error;
          callback && callback(e);
        });
        el._vClipBoard = clipboard;
      }
    }
  },
  update(el, binding) {
    if (binding.arg === 'success') {
      el._vClipBoard_success = binding.value || _default_clipboard_success;
    } else if (binding.arg === 'error') {
      el._vClipBoard_error = binding.value || _default_clipboard_error;
    } else {
      el._vClipBoard.text = function () { return binding.value; };
      el._vClipBoard.action = () => binding.arg === 'cut' ? 'cut' : 'copy';
    }
  },
  unbind(el, binding) {
    if (!el._vClipboard) return
    if (binding.arg === 'success') {
      delete el._vClipBoard_success;
    } else if (binding.arg === 'error') {
      delete el._vClipBoard_error;
    } else {
      el._vClipBoard.destroy();
      delete el._vClipBoard;
    }
  }
}
