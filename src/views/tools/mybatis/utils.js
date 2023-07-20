import {isArray, isObj, isString, toCamel, toSnakeCase} from '../../../utils/index'

function getSpace(number) {
  return Array(number).fill(' ').join('')
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
      if (isObj(temp)) {
        rs = rs.concat(getSpace(indentSize), `<collection property="${toCamel(key)}" ofType="">\n`)
        rs = rs.concat(getSpace(indentSize), getResultMap(temp, indentSize + 2))
        rs = rs.concat(getSpace(indentSize), `</collection>\n`)
      }
    } else {
      rs = rs.concat(getSpace(indentSize), `<result property="${toCamel(key)}" column="${toSnakeCase(key)}"/>\n`)
    }
  }
  return rs
}

