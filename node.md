# Node.js

## 1 . 线程和进程

​	根本区别：进程是操作系统资源分配的基本单位，而线程是任务调度和执行的基本单位

​	在开销方面：每个进程都有独立的代码和数据空间（程序上下文），程序之间的切换会有较大的开销；线程可以看做轻量级的进程，同一类线程共享代码和数据空间，每个线程都有自己独立的运行栈和程序计数器（PC），线程之间切换的开销小。

​	所处环境：在操作系统中能同时运行多个进程（程序）；而在同一个进程（程序）中有多个线程同时执行（通过CPU调度，在每个时间片中只有一个线程执行）

​	内存分配方面：系统在运行的时候会为每个进程分配不同的内存空间；而对线程而言，除了CPU外，系统不会为线程分配内存（线程所使用的资源来自其所属进程的资源），线程组之间只能共享资源。

​	包含关系：没有线程的进程可以看做是单线程的，如果一个进程内有多个线程，则执行过程不是一条线的，而是多条线（线程）共同完成的；线程是进程的一部分，所以线程也被称为轻权进程或者轻量级进程。

## 2.Node 简介

 	node.js是一个能在服务器端运行js的开放源代码跨平台的js运行环境。node使用v8引擎运行js代码。其特点是 事件驱动 非阻塞 和异步 io等技术提高性能。node处理请求时是单线程。



## 3.模块

​	 通过 require() 引入其他模块 ， 使用 exports. 暴露 。



###  3.1模块详解

​	核心模块：由node引擎提供的模块  ， 核心模块的标识就是 ruquire（模块的名字）

​	 由用户自己创建的模块:  文件模块的标识就是文件的路径（绝对路径，相对路径）相对路径使用.或..开头

 	在node中有一个全局对象 global，它的作用和网页中window类似
		在全局中创建的变量都会作为global的属性保存
		在全局中创建的函数都会作为global的方法保存

```javascript
当node在执行模块中的代码时，
		function (exports, require, module, __filename, __dirname) {
					//your code
 			}

 exports  该对象用来将变量或函数暴露到外部

 require 函数，用来引入外部的模块

	module module代表的是当前模块本身 exports就是module的属性 既可以使用 exports 导出，也可以使用module.exports导出

	__filename：当前模块的完整路径

	__dirname： 当前模块所在文件夹的完整路径

```

### 3.2 module 和 module.default

```javascript
	通过exports只能使用.的方式来向外暴露内部变量
		exports.xxx = xxx
	
 而module.exports既可以通过.的形式，也可以直接赋值
		module.exports.xxx = xxxx
		module.exports = {}


```
## 4. 包

​	包结构：

```javascript
-package.json    描述文件（必需）
-bin  可执行二进制文件
-lib  依赖的js代码
-doc  文档
-tset 单元测试

```

### 4.1 npm

```javascript
npm -v 查看npm的版本
npm version 查看所有模块的版本
npm search 包名 搜索包
npm install / i 包名 安装包
npm remove / r 包名 删除包
npm install 包名 --save 安装包并添加到依赖中 
npm install 下载当前项目所依赖的包
npm install 包名 -g 全局安装包（全局安装的包一般都是一些工具）

npm remove 包名
npm config set registry 地址 设置镜像源
```

### 4.2 node 搜索包的流程:

​	node在使用模块名字来引入模块时，它会首先在当前目录的node_modules中寻找是否含有该模块
如果有则直接使用，如果没有则去上一级目录的node_modules中寻找如果有则直接使用，如果没有则再去上一级目录寻找，直到找到为止直到找到磁盘的根目录，如果依然没有，则报错。

## 5. Buffer 缓冲区

 	Buffer的结构和数组很像，操作的方法也和数组类似

​	数组中不能存储二进制的文件，而buffer就是专门用来存储二进制数据  使用buffer不需要引入模块，

直接使用即可 。在buffer中存储的都是二进制数据，但是在显示时都是以16进制的形式显示buffer中每一个元素的范围是从00  - ff     0 - 255(十进制)  00000000 - 11111111

			计算机 一个0 或一个1 我们称为1位（bit）
	
			8bit = 1byte（字节）
			1024byte = 1kb
			1024kb = 1mb
			1024mb = 1gb
			1024gb = 1tb
	
			buffer中的一个元素，占用内存的一个字节
	
		- Buffer的大小一旦确定，则不能修改，Buffer实际上是对底层内存的直接操作
## 6 .fs模块

### 6.1同步文件操作

```javascript
同步文件的写入
		- 手动操作的步骤
			1.打开文件
 				fs.openSync(path, flags[, mode])
 					- path 要打开文件的路径
 					- flags 打开文件要做的操作的类型
 						r 只读的
 						w 可写的
 					- mode 设置文件的操作权限，一般不传
				 返回值：
				 - 该方法会返回一个文件的描述符作为结果，我们可以通过该描述符来对文件进行各种操作

			2.向文件中写入内容
 				fs.writeSync(fd, string[, position[, encoding]])
 					- fd 文件的描述符，需要传递要写入的文件的描述符
 					- string 要写入的内容
 					- position 写入的起始位置
 					- encoding 写入的编码，默认utf-8

			3.保存并关闭文件
 				fs.closeSync(fd)
 					- fd 要关闭的文件的描述符
          
```

### 6.2异步文件操作

```javascript
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


读取文件
fs.readFile("hello.txt",function(err,data){
  if(!err){
    fs.writeFile("yibu.txt",data,function(err){ //读取并且写入	
      if(!err){
        console.log("成功")
      }
    })
  }
})
```

### 6.3流式文件操作

```javascript
-写入
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

--读取 
var fs  = require('fs');

var rs = fs.createReadStream("yibu.txt");
var ws = fs.createWriteStream("yibu2.txt");
rs.once("open",function(){
  console.log("可读流打开了")
})

rs.once("close",function(){
  console.log("可读流关闭了")
  //读取完毕 关闭可写流
  ws.end();
})

ws.once("open",function(){
  console.log("可写流打开了")

})

ws.once("close",function(){
  console.log("可写流关闭了")
})

rs.on("data",function(data){  //流式文件读取数据 一次只读一部分
   ws.write(data)
})

-- 使用 pipe将读取的流文件写入
var fs  = require('fs');

var rs = fs.createReadStream("yibu.txt");
var ws = fs.createWriteStream("yibu2.txt");

rs.pipe(ws)

```

