let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
let mime = require('mime');
let user = [
  {
    id: 1, username: 'ywh', password: '你好123124'
  }, {
    id: 2, username: 'ywh2', password: '123456'
  }];


http.createServer(function (req, res) {
  let {pathname, query} = url.parse(req.url, true);
  //处理后台
  if (pathname === '/user') {
    let id = query.id;
    switch (req.method) {
      case 'GET':
        if (!id) {
          res.setHeader("Content-Type", 'application/json;charset=utf-8');
          res.end(JSON.stringify(user))
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', function (chunk) {
          str += chunk
        });
        req.on('end', function () {
          let user1 = JSON.parse(str);
          user1.id = user.length ? user[user.length - 1].id + 1 : 1;
          user.push(user1);
          res.end(JSON.stringify(user1));
        });
        break;
      case 'DELETE':
        if (id) {
          user = user.filter(item => item.id != id
          )
          ;
          res.end(JSON.stringify({}));
        }
        break;
      case 'PUT':
        break;
    }
    return
  }
  //处理静态页面
  fs.stat('.' + pathname, function (err, stats) {
    if (err) {
      res.statusCode = 404;
      res.end(`${pathname} not fount`)
    } else if (stats.isFile()) {
      res.setHeader('Content-Type', mime.getType() + ';charset=utf8');
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