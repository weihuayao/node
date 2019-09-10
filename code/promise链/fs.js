let fs = require('fs');
let util = require('util');
// 回调地狱
fs.readFile('1.txt', 'utf8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  fs.readFile(data, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }
    console.log(data)
  })
})


// 自己封装
function read(url) {
  return new Promise(((resolve, reject) => {
    fs.readFile(url, 'utf8', function (err, data) {
      if (err) return reject(err)
      resolve(data)
    })
  }))
}

// read('1.txt').then(function (data) {
//   console.log(data)
// }, function (err) {
//   console.log(err)
// })


//util
let utilRead = util.promisify(fs.readFile)
// util
utilRead('./1.txt', 'utf8').then(function (data) {
  utilRead(data, 'utf8').then(function (data) {
    console.log(data)
  })
}).catch((err) => {
  console.log(err)
})

// 链式调用
utilRead('./1.txt', 'utf8')
  .then(function (data) {
    return utilRead(data, 'utf8')
  })
  .then(function (data) {
    console.log('....')
    console.log(data)
    return data + '3'
  })
  .then(function (data) {
    console.log(data)
  })
  .catch((err) => {
    console.log(err)
  })
