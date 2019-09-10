var fs  = require('fs');

var rs = fs.createReadStream("yibu.txt");
var ws = fs.createWriteStream("yibu2.txt");

rs.pipe(ws)
// rs.once("open",function(){
//   console.log("可读流打开了")
// })

// rs.once("close",function(){
//   console.log("可读流关闭了")
//   //读取完毕 关闭可写流
//   ws.end();
// })

// ws.once("open",function(){
//   console.log("可写流打开了")

// })

// ws.once("close",function(){
//   console.log("可写流关闭了")
// })

// rs.on("data",function(data){  //流式文件读取数据 一次只读一部分
//    ws.write(data)
// })

