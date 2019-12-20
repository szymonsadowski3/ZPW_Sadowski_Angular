var connect = require('connect');
var serveStatic = require('serve-static');
connect().use( serveStatic("dist/hello-world")).listen(5001);
