let fs = require('fs')

let count = 1
let num = 1

function pipe(source, target) {
  let rs = fs.createReadStream(source, {highWaterMark: 4})
  let ws = fs.createWriteStream(target, {highWaterMark: 1})
  // pipe 实现
  rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {
      rs.pause()
      num++
    }
  });
  ws.on('drain', function () {
    rs.resume()
    count++
  })
  rs.on('end', function () {
    console.log(num + " " + count)
    ws.end()
  })
}

function pipe2(source, target) {
  let rs = fs.createReadStream(source, {highWaterMark: 4})
  let ws = fs.createWriteStream(target, {highWaterMark: 1})
  rs.pipe(ws)
}


pipe('./1.txt', './2.txt')
pipe2('./1.txt', './3.txt')