let fs = require('fs')

let ws = fs.createWriteStream('./1.txt', {highWaterMark: 1});
ws.write("hello world")
ws.end("1!")