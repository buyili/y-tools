import { isArray, isObj, isString } from '../../../utils/index'

function getSpace(number) {
  return Array(number).fill(' ').join('')
}

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

export function getResultMap(jsonText, indentSize = 2) {
  let jsonObj = Object.assign({}, jsonText)
  if (isString(jsonText)) {
    jsonObj = JSON.parse(jsonText)
  }
  let rs = ''
  for (const key in jsonObj) {
    if (isObj(jsonObj[key])) {
      console.log(jsonObj[key])
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

