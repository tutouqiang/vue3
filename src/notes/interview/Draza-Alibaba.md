# Draza 海外电商
## 笔试
```javascript
// 1 this 指向问题

var name = 'map'

function print () {
  console.log(this.name);
}
var obj = {
  name: 'Object',
  fn: function(fn) {
    fn && fn()
    return () => console.log(this.name);
  }
}
const b = obj.fn(print)
b()

const c = obj.fn
const d = c(print)
d()

// 2 任务队列问题
console.log(1)

async function async1 () {
  console.log(2);
  await async2();
  console.log(3)
}

async function async2 () {
  return new Promise((resolve, reject) => {
    console.log(4)
    resolve()
  }).then(res => {
    console.log(5);
  })
}

setTimeout(function(){
  console.log(6);
},0)

async1()

console.log(7)


// 3  深度比对两个对象 deep campare

let toString = Object.prototype.toString
function isType (data) {
  let t = toString.call(data)
  return t.split(' ')[1]
}
function deep (O1, O2) {
  if(isType(O1) !== isType(O2)) return false
  if(isType(O1) === 'Object') {
    for(let key in O1) {
      if(!deep(O1[key], O2[key])) {
        return false
      }
    }
  } else if(isType(O1) === 'Array') {
    O1.forEach((item, index) => {
      if(!deep(O1[index], O2[index])) {
        return false
      }
    });
  } else {
    if(O1 !== O2 && isType(O1) !== 'NaN') return false
  }
  return true
}

// 4 防抖函数

function debounce (fn, time) {
  let timer = null

  if(timer !== null) {
    clearTimeout(timer)
    timer = setTimeout(function(){
      fn && fn()
    }, time)
  }
}

// 5 给定一个数组 nums，给定一个 target 求出数组中两个元素相加 === target 的下标
// nums [1,2,3,4,5] target 4 return [0, 2]

function num (nums, target) {
  let arr = []
  for(let x = 0; i < nums.length; i++) {
    for(let y = x + 1; y < nums.length; y++) {
      if(nums[x] + nums[y] === target) {
        arr = [x, y]
        break
      }
    }
  }
  return arr
}


// 6 两个数字字符串，已经超出 javascript 的精度范围 求两个数字字符串的和 ’1234‘ + ’4321‘  return 5555

function num (n1,n2) {
  let pre = 0
  let arrN1 = n1.split('')
  let arrN2 = n2.split('')
  let len = arrN1.length > arrN2.length ? arrN1.length : arrN2.length
  let arr = []
  while(len > 0) {
    --len
    let one = arrN1.length - arr.length - 1
    let two = arrN2.length  - arr.length - 1
    let newValue = parseInt(arrN1[one] || 0) + parseInt(arrN2[two] || 0) + pre
    pre = newValue > 9 ? parseInt(newValue.toString().split('')[0]) : 0
    arr.unshift(len === 0 ? newValue : newValue > 9 ? parseInt(newValue.toString().split('')[1]) : newValue)
    
  }
  return arr.join('')
}

// 7 英文题目，给出一个二维数组模拟办公室的几排工位，每个工位有指定标记的人员，给出感染人的标记，为数字 。 每组有 1 - 3 个人，其中有一个人得新冠了，一天内会感染该人的上下左右的人，问几天能感染所有人

// [[2,2]   exmple: 1  没有标记为 1 的人
//  [2,2]]
// return 0

// [[2,1,1]  exple: 2
//  [1,1,1]
//  [1,1,1]]
// return 4
```
