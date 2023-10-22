import {isArray, isObj, isString, toCamel, toSnakeCase} from '../../../utils/index'

function getSpace(number) {
  return Array(number).fill(' ').join('')
}

const pattern = /([\w-]+)\s*:\s*(.+);/g;

function isRGBA(str){
  return str.indexOf('rgba') === 0;
}

function rgbaToHex(r, g, b, a) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + a.toString(16).toUpperCase().padStart(2, '0');
}

function rgbaStrToHex(ragaStr){
  let regexp = /rgba\((.*),(.*),(.*),(.*)\)/g
  let arr = regexp.exec(ragaStr)
  let rs = rgbaToHex(arr[1], arr[2], arr[3], arr[4])
  return rs;
}

export function parseFun(cssContent){
  // console.log(cssContent.match(pattern))
  const arr = cssContent.match(pattern).map(str=>{
    const rs = pattern.exec(str);
    pattern.lastIndex = 0;
    // console.log("str = ["+ str+ "] rs = ",rs)
    if(rs){
      const name = rs[1];
      const value = rs[2];
      return {
        name: name.replaceAll("--", "").replaceAll("-", "_"),
        value: isRGBA(value) ? rgbaStrToHex(value) : value
      }
    }
  })
  return arr;
}
