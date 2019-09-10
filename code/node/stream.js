var fs  = require('fs');

var wd = fs.createWriteStream("yibu.txt",{flags:"a"});
wd.once("open",function(){
  console.log("流打开了")
})

wd.once("close",function(){
  console.log("流关闭了")
})
wd.write("通过流写入")
wd.write("通过流写入")
wd.write("通过流写入")

wd.end()

fs.readFile("hello.txt",function(err,data){
  if(!err){
    fs.writeFile("yibu.txt",data,function(err){
      if(!err){
        console.log("成功")
      }
    })
  }
})