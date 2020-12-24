const debug = require('debug');
const httpDebug = debug('http'); // create a http namespace debug

debug.enable('http'); // bootstrap http namespace

const http = require('http');
const name = 'MyAPP';

httpDebug('booting %o', name);

http
  .createServer((req, res) => {
    httpDebug(req.method + '' + req.url);
    res.end('hello\n');
  })
  .listen(3000, () => {
    httpDebug('listening');
  });
