let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let mime = require('mime');
http.createServer(function (req, res) {
  let {pathname, query} = url.parse(req.url, true);
  //处理后台
  if (pathname === '/clock') {
    let date = new Date();
    res.end(JSON.stringify({time: date.toLocaleString()}));
    return
  }
  //处理静态页面
  fs.stat('.' + pathname, function (err, stats) {
    if (err) {
      res.statusCode = 404;
      res.end(`${pathname} not fount`)
    } else if (stats.isFile()) {
      res.setHeader('Content-Type',mime.getType() + ';charset=utf8');
      fs.createReadStream('.' + pathname).pipe(res)
    } else if (stats.isDirectory()) {
      res.setHeader('Content-Type', 'text/html;charset=utf8');
      let p = path.join('.' + pathname, './index.html');
      fs.createReadStream(p).pipe(res)
    }

  })


}).listen(3000, () => {
  console.log('listening 3000')
});