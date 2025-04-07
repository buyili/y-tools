const isString = o => Object.prototype.toString.call(o).slice(8, -1) === 'String' //是否是字符串
const isNumber = o => Object.prototype.toString.call(o).slice(8, -1) === 'Number' //是否数字
const isObj = o => Object.prototype.toString.call(o).slice(8, -1) === 'Object' //是否对象
const isArray = o => Object.prototype.toString.call(o).slice(8, -1) === 'Array' //是否数组
const isDate = o => Object.prototype.toString.call(o).slice(8, -1) === 'Date' //是否时间
const isBoolean = o => Object.prototype.toString.call(o).slice(8, -1) === 'Boolean' //是否boolean
const isFunction = o => Object.prototype.toString.call(o).slice(8, -1) === 'Function' //是否函数
const isNull = o => Object.prototype.toString.call(o).slice(8, -1) === 'Null' //是否为null
const isUndefined = o => Object.prototype.toString.call(o).slice(8, -1) === 'Undefined' //是否为undefined

function toLowerLine(str) {
  var temp = str.replace(/[A-Z]/g, function (match) {
    return '_' + match.toLowerCase()
  })
  if (temp.slice(0, 1) === '_') {
    //如果首字母是大写，执行replace时会多一个_，这里需要去掉
    temp = temp.slice(1)
  }
  return temp
}

// console.log(toLowerLine('TestToLowerLine'))//test_to_lower_line
// console.log(toLowerLine('testToLowerLine'))  //test_to_lower_line
function toCamel(str) {
  return str.replace(/([^_])(?:_+([^_]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase()
  })
}

// console.log(toCamel('test_to_camel')) //testToCamel

function getSpace(number){
  return Array(number).fill(' ').join("")
}

function getResultMap(jsonText, indentSize = 0) {
  let jsonObj = Object.assign({}, jsonText)
  if (isString(jsonText)) {
    jsonObj = JSON.parse(jsonText)
  }
  let rs = ''
  for (const key in jsonObj) {
    if (isObj(jsonObj[key])) {
      let temp = jsonObj[key]
      rs = rs.concat(getSpace(indentSize), `<association  property="${toCamel(key)}" ofType="">\n`)
      rs = rs.concat(getSpace(indentSize), getResultMap(temp, indentSize + 2))
      rs = rs.concat(getSpace(indentSize), `</association >\n`)
    } else if (isArray(jsonObj[key])) {
      let temp = jsonObj[key][0]
      if(isObj(temp)){
        rs = rs.concat(getSpace(indentSize), `<collection property="${toCamel(key)}" ofType="">\n`)
        rs = rs.concat(getSpace(indentSize), getResultMap(temp, indentSize + 2))
        rs = rs.concat(getSpace(indentSize), `</collection>\n`)
      }
    } else {
      rs = rs.concat(getSpace(indentSize), `<result property="${toCamel(key)}" column="${toLowerLine(key)}"/>\n`)
    }
  }
  return rs
}

console.log(getResultMap('{\n' +
  '  "id": "",\n' +
  '  "name": "",\n' +
  '  "cover": "",\n' +
  '  "currencyId": "",\n' +
  '  "type": 0,\n' +
  '  "remark": "",\n' +
  '  "budget": 0.00,\n' +
  '  "expend": 0.00,\n' +
  '  "income": 0.00,\n' +
  '  "keepAccountsTotal": 0,\n' +
  '  "users": [\n' +
  '    {\n' +
  '      "id": "",\n' +
  '      "nickname": "",\n' +
  '      "avatar": ""\n' +
  '    }\n' +
  '  ]\n' +
  '}'))
