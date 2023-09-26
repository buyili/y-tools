import {
  isArray,
  isBoolean,
  isDate,
  isFunction,
  isNull,
  isNumber,
  isObj,
  isString,
  isUndefined
} from '../../../utils/index'

function getSpace(number) {
  return Array(number).fill(' ').join('')
}

function getType(value) {
  if (isString(value)) return 'string';
  if (isBoolean(value)) return 'boolean';
  if (isNumber(value)) return 'number';
  if (isDate(value)) return 'date';
  if (isFunction(value)) return '() => void';
  if (isNull(value)) return 'null';
  if (isUndefined(value)) return 'undefined';
}

function isBasicType(value) {
  return isString(value) || isBoolean(value) || isNumber(value);
}

function getKeyStr(key, options) {
  return `${key}${options?.includeQuestionMark ? '?' : ''}`
}

function toTsDeclare(obj, indentSize, options) {
  let rs = ''
  if (isObj(obj)) {
    rs = rs.concat(`{\n`)
    for (const key in obj) {
      let temp = obj[key]
      // console.log(`${key}: ${toTsDeclare(temp, indentSize)}`)
      rs = rs.concat(getSpace(indentSize), `${getKeyStr(key, options)}: ${toTsDeclare(temp, indentSize + 2, options)}\n`)
    }
    rs = rs.concat(getSpace(indentSize), `}`)
  } else if (isArray(obj)) {
    let temp = obj[0]
    rs = rs.concat(`${toTsDeclare(temp, indentSize + 2, options)}[]`)
  } else {
    return (getType(obj) + (options?.includeSemicolon ? ';' : ''));
  }
  return rs
}

export function getTsDeclare(jsonText, indentSize = 2, options = { includeQuestionMark: true, includeSemicolon: true }) {
  let jsonObj = Object.assign({}, jsonText)
  if (isString(jsonText)) {
    jsonObj = JSON.parse(jsonText)
  }
  return toTsDeclare(jsonObj, indentSize, options);
}


// export function getTsDeclare(jsonText, indentSize = 2) {
//   let jsonObj = Object.assign({}, jsonText)
//   if (isString(jsonText)) {
//     jsonObj = JSON.parse(jsonText)
//   }
//   let rs = ''
//   for (const key in jsonObj) {
//     if (isObj(jsonObj[key])) {
//       console.log(jsonObj[key])
//       let temp = jsonObj[key]
//       rs = rs.concat(getSpace(indentSize), `${key}: {\n`)
//       rs = rs.concat(getSpace(indentSize), getTsDeclare(temp, indentSize + 2))
//       rs = rs.concat(getSpace(indentSize), `}\n`)
//     } else if (isArray(jsonObj[key])) {
//       let temp = jsonObj[key][0]
//       if (isObj(temp)) {
//         rs = rs.concat(getSpace(indentSize), `[{\n`)
//         rs = rs.concat(getSpace(indentSize), getTsDeclare(temp, indentSize + 2))
//         rs = rs.concat(getSpace(indentSize), `}]\n`)
//       } else {
//         rs = rs.concat(getSpace(indentSize), `${key}: ${getType(temp)}[]\n`)
//       }
//     } else {
//       rs = rs.concat(getSpace(indentSize), `${key}: ${getType(jsonObj[key])};\n`)
//     }
//   }
//   return rs
// }

