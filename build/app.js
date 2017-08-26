'use strict';

var _login = require('./routes/login');

var _login2 = _interopRequireDefault(_login);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var privateKey = _fs2.default.readFileSync('sslcert/key.pem');
var certificate = _fs2.default.readFileSync('sslcert/cert.pem');

var credentials = { key: privateKey, cert: certificate };
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({
    extended: true
}));

app.use('/login', _login2.default);

var httpServer = _http2.default.createServer(app);
var httpsServer = _https2.default.createServer(credentials, app);

httpServer.listen(8080);
// httpsServer.listen(443);