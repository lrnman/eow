/**
 * Created by Jerry on 2017/1/14.
 */
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var ejs = require('ejs');
var mime = require('mime');

var server = http.createServer(function (req, res) {

    var surl = req.url;
    //对路径解码，防止中文乱码,最后规范化
    var filePath = path.normalize(decodeURI(url.parse(surl).pathname));

    //处理首页的情况
    filePath = filePath == path.normalize('/') ? '/index.html':filePath;

    //设置头类型
    var contentType = mime.lookup(filePath);
    res.writeHead(200, { "content-type": contentType});

    //返回文件
    var readStream = fs.createReadStream('.' + filePath);
    readStream.pipe(res);

    //处理找不到文件的情况
    readStream.on('error', function (err) {
        res.writeHead(404, { "content-type": contentType=='application/octet-stream'?'text/html':contentType});
        ejs.renderFile('./404.ejs', {"filename": filePath.substring(1)}, function (err, data){
            if(err) {
                console.log(err);
                return;
            }
            res.write(data.toString());
            res.end();
        });
    });

});

server.listen(2999);