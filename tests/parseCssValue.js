const cssContent = `
--weui-BG-0: #ededed;
  --weui-BG-1: #f7f7f7;
  --weui-BG-2: #fff;
  --weui-BG-3: #f7f7f7;
  --weui-BG-4: #4c4c4c;
  --weui-BG-5: #fff;
  --weui-FG-0: rgba(0, 0, 0, 0.9);
  --weui-FG-HALF: rgba(0, 0, 0, 0.9);
  --weui-FG-1: rgba(0, 0, 0, 0.55);
  --weui-FG-2: rgba(0, 0, 0, 0.3);
  --weui-FG-3: rgba(0, 0, 0, 0.1);
  --weui-FG-4: rgba(0, 0, 0, 0.15);
  --weui-FG-5: rgba(0, 0, 0, 0.05);
  --weui-RED: #fa5151;
  --weui-ORANGERED: #ff6146;
  --weui-ORANGE: #fa9d3b;
  --weui-YELLOW: #ffc300;
  --weui-GREEN: #91d300;
  --weui-LIGHTGREEN: #95ec69;
  --weui-BRAND: #07c160;
  --weui-BLUE: #10aeff;
  --weui-INDIGO: #1485ee;
  --weui-PURPLE: #6467f0;
  --weui-WHITE: #fff;
  --weui-LINK: #576b95;
  --weui-TEXTGREEN: #06ae56;
  --weui-FG: #000;
  --weui-BG: #fff;
  --weui-TAG-TEXT-RED: rgba(250, 81, 81, 0.6);
  --weui-TAG-BACKGROUND-RED: rgba(250, 81, 81, 0.1);
  --weui-TAG-TEXT-ORANGE: #fa9d3b;
  --weui-TAG-BACKGROUND-ORANGE: rgba(250, 157, 59, 0.1);
  --weui-TAG-TEXT-GREEN: #06ae56;
  --weui-TAG-BACKGROUND-GREEN: rgba(6, 174, 86, 0.1);
  --weui-TAG-TEXT-BLUE: #10aeff;
  --weui-TAG-BACKGROUND-BLUE: rgba(16, 174, 255, 0.1);
  --weui-TAG-TEXT-BLACK: rgba(0, 0, 0, 0.5);
  --weui-TAG-BACKGROUND-BLACK: rgba(0, 0, 0, 0.05);
  --weui-REDORANGE: #ff6146;
`;
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
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1) + a.toString(16).toUpperCase().padStart(2, '0');
}

function rgbaToHexAARRGGBB(r, g, b, a) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  a = Math.round(a * 255);
  return "#" + alphaToHex(a) + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbaStrToHex(ragaStr){
  let regexp = /rgba\((.*),(.*),(.*),(.*)\)/g
  let arr = regexp.exec(ragaStr)
  console.log(arr)
  let rs = rgbaToHex(arr[1], arr[2], arr[3], arr[4])
  return rs;
}

function rgbaStrToHexAARRGGBB(ragaStr){
  let regexp = /rgba\((.*),(.*),(.*),(.*)\)/g
  let arr = regexp.exec(ragaStr)
  let rs = rgbaToHexAARRGGBB(arr[1], arr[2], arr[3], arr[4])
  return rs;
}

function parseFun(cssContent, option = {forHOS: false}){
  console.log(cssContent.match(pattern))
  const rgbaStrToHexFun = option.forHOS ? rgbaStrToHexAARRGGBB : rgbaStrToHex;
  const arr = cssContent.match(pattern).map(str=>{
    const rs = pattern.exec(str);
    pattern.lastIndex = 0;
    console.log("str = ["+ str+ "] rs = ",rs)
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

// const rs = parseFun(cssContent);
const rs = parseFun(cssContent, {forHOS: true});

console.log(JSON.stringify(rs, null, 2))


// console.log(regexp.exec("--weui-TAG-BACKGROUND-BLACK: rgba(0, 0, 0, 0.05);"))
// console.log(pattern.exec("--weui-TAG-BACKGROUND-GREEN: rgba(6, 174, 86, 0.1);"))
