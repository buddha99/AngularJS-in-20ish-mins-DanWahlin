var http = require("http");
var fs = require("fs");


http.createServer( function (req, res){
    var contentType;
    if(req.url.indexOf('.js') != -1){
        contentType = "application/javascript";
    }
    else{
        if(req.url.indexOf('.json') != -1){
            contentType = "text/json";
        }
        else{
            contentType = "text/html";
        }
    }
    res.writeHead(200, {'Content-Type': contentType});
    
    if(req.url == '/'){
        res.end(fs.readFileSync('index.html'));
    }
    else{
        if(req.url.indexOf('favicon.ico') != -1)
        {
            res.end();
        }
        res.end(fs.readFileSync(__dirname + req.url));
    }
    console.log(req.url);
}).listen(3000);
 