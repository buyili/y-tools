import {isArray, isObj, isString, toCamel, toSnakeCase} from '../../../utils/index'

function getSpace(number) {
  return Array(number).fill(' ').join('')
}

const pattern = /([\w-]+)\s*:\s*(.+);/g;

function isRGBA(str){
  return str.indexOf('rgba') === 0;
}

function alphaToHex(a){
  return a.toString(16).padStart(2, '0')
}

function rgbaToHex(r, g, b, a) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + alphaToHex(a);
}

function rgbaToHexAARRGGBB(r, g, b, a) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return "#" + alphaToHex(a) + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 *
 * @param {string} ragaStr rgba格式的颜色值，示例：rgba(0, 0, 0, 0.9)
 * @returns {string} 返回HEX格式 #rrggbbaa，示例：#000000e6
 */
function rgbaStrToHex(ragaStr){
  let regexp = /rgba\((.*),(.*),(.*),(.*)\)/g
  let arr = regexp.exec(ragaStr)
  let rs = rgbaToHex(arr[1], arr[2], arr[3], arr[4])
  return rs;
}

/**
 * 适用于HarmonyOS API。因为HarmonyOS的HEX格式是 #aarrggbb，
 * https://developer.huawei.com/consumer/cn/doc/harmonyos-references-V2/js-appendix-types-0000001478341245-V2#ZH-CN_TOPIC_0000001523648682__%E9%A2%9C%E8%89%B2%E7%B1%BB%E5%9E%8B
 * @param {string} ragaStr rgba格式的颜色值，示例：rgba(0, 0, 0, 0.9)
 * @returns {string} 返回HEX格式 #aarrggbb，示例：#e6000000
 */
function rgbaStrToHexAARRGGBB(ragaStr){
  let regexp = /rgba\((.*),(.*),(.*),(.*)\)/g
  let arr = regexp.exec(ragaStr)
  let rs = rgbaToHexAARRGGBB(arr[1], arr[2], arr[3], arr[4])
  return rs;
}

export function parseFun(cssContent, option = {forHOS: false}){
  // console.log(cssContent.match(pattern))
  const rgbaStrToHexFun = option.forHOS ? rgbaStrToHexAARRGGBB : rgbaStrToHex;
  const arr = cssContent.match(pattern).map(str=>{
    const rs = pattern.exec(str);
    pattern.lastIndex = 0;
    // console.log("str = ["+ str+ "] rs = ",rs)
    if(rs){
      const name = rs[1];
      const value = rs[2];
      return {
        name: name.replaceAll("--", "").replaceAll("-", "_"),
        value: isRGBA(value) ? rgbaStrToHexFun(value) : value
      }
    }
  })
  return arr;
}
