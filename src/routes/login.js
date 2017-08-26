import express from 'express';
import mysql from 'mysql';
import config from '../config'

let router = express.Router();

let connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

router.post('/', function(req, res) {
    let {username, password} = req.body;
    console.log(username + ' ' + password + '');
    if(username && password) {
      let query = 'SELECT * from users where username = ?';
      console.log(query);
      connection.query(query, [username], function (err, rows, fields) {
        if(err) {
          console.log(500);
          return res.status(500).send({
            message: 'INTERNAL SERVER ERROR'
          });
        } 

        if(rows[0] && rows[0].password === password) {
          console.log(204);
          return res.status(204).send()
        } else {
          console.log(400);
          return res.status(400).send({
            message: 'Invalid username or password'
          })
        }
      })
    } else {
      console.log(400);
      return res.status(400).send({
        message: 'username and password required'
      })
    }
  })

  export default router;