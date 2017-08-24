import express from 'express';
import mysql from 'mysql';

let router = express.Router();

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'ioa'
});

router.post('/', function(req, res) {
    let {username, password} = req.body;
    console.log(username + ' ' + password + '');
    // if(username && password) {
      let query = 'SELECT * from users where username = ?';
      console.log(query);
      connection.query(query, [username], function (err, rows, fields) {
        if(err) {
          console.log(500);
          return res.status(500).send({
            message: 'INTERNAL SERVER ERROR'
          });
        }
  
        if(rows[0]) {
          console.log(rows[0].username + ' and ' + rows[0].password);
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
    // } else {
      // console.log(400);
      // return res.status(400).send({
        // message: 'username and password required'
      // })
    // }
})

  export default router;