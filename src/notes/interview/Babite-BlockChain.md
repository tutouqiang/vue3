# 巴比特-区块链平台

## 笔试
```javascript
1、输出——深浅克隆
let a = {age: 20}
let b = a
b.age = 21
console.log(b.age)

2、输出顺序——微任务、宏任务
setTimeout(()=>{
  console.log(1)
},0)

new Promise((resolve, reject) => {
  console.log(2)
  resolve()
  console.log(3)
}).then(res => {
  console.log(4)
})

console.log(5)

3、出栈顺序——
现有6个元素6、5、4、3、2、1，按照顺序入栈，找出出栈错误的选项

4、找出字符串中最长的回文字符串

var loggerString = (s) => {
  let str = ''
  for(let i = 0; i < s.length; i++) {
    for(let j = i + 1; j < s.length; j++) {
      if(s[i] === s[j]) {
        if(j-i <= 2) {
          str = isReplace(str, s.slice(i,j+1))
        } else {
          let pre = i;
          let next = j;
          let flag = true;
          let newStr = s.slice(i, j+1)
          // console.log(newStr, i, j);
          while(next - pre > 0) {
            if(s[pre] !== s[next]) {
              flag = false
              break;
            }
            pre++
            next--
          }
          if(flag) {
            str = isReplace(str, newStr)
          }
        }
      }
    }
  }
  return str === '' ? s[0] : str
}

function isReplace (pre, next) {
  // console.log(pre, next);
  if(pre.length < next.length) {
    return next
  }
  return pre
}

5、给出一个字符串，按照行数摆成 z 字形，然后按照行的顺序，从前往后，从左往右重组并输出字符串
```
