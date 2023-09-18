import {isArray, isBoolean, isNumber, isObj, isString, isDate, isFunction, isNull, isUndefined} from '../../../utils/index'

function getSpace(number) {
  return Array(number).fill(' ').join('')
}

function getType(value){
  if(isString(value)) return 'string';
  if(isBoolean(value)) return 'boolean';
  if(isNumber(value)) return 'number';
  if(isDate(value)) return 'date';
  if(isFunction(value)) return '() => void';
  if(isNull(value)) return 'null';
  if(isUndefined(value)) return 'undefined';
}

// export function getTsDeclare(jsonText, indentSize = 2) {
//   let jsonObj = Object.assign({}, jsonText)
//   if (isString(jsonText)) {
//     jsonObj = JSON.parse(jsonText)
//   }
//   let rs = ''
//   if (isObj(jsonObj)) {
//     let temp = jsonObj[key]
//     rs = rs.concat(getSpace(indentSize), `{\n`)
//     rs = rs.concat(getSpace(indentSize), getTsDeclare(temp, indentSize + 2))
//     rs = rs.concat(getSpace(indentSize), `}\n`)
//   } else if (isArray(jsonObj[key])) {
//     let temp = jsonObj[key][0]
    
//     rs = rs.concat(getSpace(indentSize), `[\n`)
//     rs = rs.concat(getSpace(indentSize), getTsDeclare(temp, indentSize + 2))
//     rs = rs.concat(getSpace(indentSize), `]\n`)
//   } else {
//     rs = rs.concat(getSpace(indentSize), `key: ${getType(jsonObj[key])};\n`)
//   }
//   return rs
// }


export function getTsDeclare(jsonText, indentSize = 2) {
  let jsonObj = Object.assign({}, jsonText)
  if (isString(jsonText)) {
    jsonObj = JSON.parse(jsonText)
  }
  let rs = ''
  for (const key in jsonObj) {
    if (isObj(jsonObj[key])) {
      console.log(jsonObj[key])
      let temp = jsonObj[key]
      rs = rs.concat(getSpace(indentSize), `${key}: {\n`)
      rs = rs.concat(getSpace(indentSize), getTsDeclare(temp, indentSize + 2))
      rs = rs.concat(getSpace(indentSize), `}\n`)
    } else if (isArray(jsonObj[key])) {
      let temp = jsonObj[key][0]
      if (isObj(temp)) {
        rs = rs.concat(getSpace(indentSize), `[{\n`)
        rs = rs.concat(getSpace(indentSize), getTsDeclare(temp, indentSize + 2))
        rs = rs.concat(getSpace(indentSize), `}]\n`)
      } else {
        rs = rs.concat(getSpace(indentSize), `${key}: ${getType(temp)}[]\n`)
      }
    } else {
      rs = rs.concat(getSpace(indentSize), `${key}: ${getType(jsonObj[key])};\n`)
    }
  }
  return rs
}

