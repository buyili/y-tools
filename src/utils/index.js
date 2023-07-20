export const isString = o => Object.prototype.toString.call(o).slice(8, -1) === "String"; //是否是字符串
export const isNumber = o => Object.prototype.toString.call(o).slice(8, -1) === "Number"; //是否数字
export const isObj = o => Object.prototype.toString.call(o).slice(8, -1) === "Object"; //是否对象
export const isArray = o => Object.prototype.toString.call(o).slice(8, -1) === "Array"; //是否数组
export const isDate = o => Object.prototype.toString.call(o).slice(8, -1) === "Date"; //是否时间
export const isBoolean = o => Object.prototype.toString.call(o).slice(8, -1) === "Boolean"; //是否boolean
export const isFunction = o => Object.prototype.toString.call(o).slice(8, -1) === "Function"; //是否函数
export const isNull = o => Object.prototype.toString.call(o).slice(8, -1) === "Null"; //是否为null
export const isUndefined = o => Object.prototype.toString.call(o).slice(8, -1) === "Undefined"; //是否为undefined

/**
 * 转下划线格式
 * @param str 待转换字符串
 * @returns {String} 下划线格式字符串
 */
export function toSnakeCase(str) {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return '_' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '_') {
    //如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

/**
 * 转驼峰格式
 * @param str 待转换字符串
 * @returns {String} 驼峰格式字符串
 */
export function toCamel(str) {
  return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase()
  })
}

export function toPascalCase(str){
  return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase()
  })
}



/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}
