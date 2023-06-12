const isString = o => Object.prototype.toString.call(o).slice(8, -1) === "String",
  isNumber = o => Object.prototype.toString.call(o).slice(8, -1) === "Number", //是否数字
  isObj = o => Object.prototype.toString.call(o).slice(8, -1) === "Object", //是否对象
  isArray = o => Object.prototype.toString.call(o).slice(8, -1) === "Array", //是否数组
  isDate = o => Object.prototype.toString.call(o).slice(8, -1) === "Date", //是否时间
  isBoolean = o => Object.prototype.toString.call(o).slice(8, -1) === "Boolean", //是否boolean
  isFunction = o => Object.prototype.toString.call(o).slice(8, -1) === "Function", //是否函数
  isNull = o => Object.prototype.toString.call(o).slice(8, -1) === "Null", //是否为null
  isUndefined = o => Ojbect.prototype.toString.call(o).slice(8, -1) === "Undefined", //是否为undefined
  temp = ""

function setDefaultValue (obj) {
  
  for (let key in obj) {
    let value = obj[key]
    if (isString(value)) {
      obj[key] = ""
    } else if (isBoolean(value)) {
    
    } else if (isArray(value)) {
      obj[key] = []
    } else if (isNumber(value)) {
      obj[key] = 0
    } else if(isObj(value)){
      obj[key] = setDefaultValue(value)
    }
  }
  return obj
}

export function getEmptyJson(jsonText){
  let jsonObj = Object.assign({}, jsonText)
  if(isString(jsonText)){
    jsonObj = JSON.parse(jsonText)
  }
  jsonObj = setDefaultValue(jsonObj)
  
  let text = JSON.stringify(jsonObj, null, 2)
  
  let rs = text.replaceAll(/"(\w+)"(\s*:\s*)/g, "$1$2")
  return rs
}
