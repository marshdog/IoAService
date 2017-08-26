'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var connection = _mysql2.default.createConnection({
  host: _config2.default.host,
  user: _config2.default.user,
  password: _config2.default.password,
  database: _config2.default.database
});

router.post('/', function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  console.log(username + ' ' + password + '');
  if (username && password) {
    var query = 'SELECT * from users where username = ?';
    console.log(query);
    connection.query(query, [username], function (err, rows, fields) {
      if (err) {
        console.log(500);
        return res.status(500).send({
          message: 'INTERNAL SERVER ERROR'
        });
      }

      if (rows[0] && rows[0].password === password) {
        console.log(204);
        return res.status(204).send();
      } else {
        console.log(400);
        return res.status(400).send({
          message: 'Invalid username or password'
        });
      }
    });
  } else {
    console.log(400);
    return res.status(400).send({
      message: 'username and password required'
    });
  }
});

exports.default = router;