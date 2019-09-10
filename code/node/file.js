//同步写入文件
var fs = require('fs');
var hello = fs.openSync("./hello.txt", "w");

fs.writeSync(hello, "asdfghjk")

fs.closeSync(hello)
 

// 异步写入文件
fs.open("yibu.txt", "w", function (err, fd) {
  if (!err) {
    fs.write(fd, '异步操作', function (err) {
      if (!err) {
        console.log('写入完成')
      }
    })
    fs.close(fd,function (err){
      if (!err) {
        console.log("关闭")
      }
    })
  } else {
    console.log(err);
  }
})