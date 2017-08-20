import loginRoute from './routes/login';


let fs = require('fs');
let http = require('http');
let https = require('https');
let privateKey  = fs.readFileSync('sslcert/key.pem');
let certificate = fs.readFileSync('sslcert/cert.pem');

let credentials = {key: privateKey, cert: certificate};
let express = require('express');
let bodyParser = require('body-parser');
let app = express();

// your express configuration here

// let mysql = require('mysql')

app.use(bodyParser.json());

app.use('/login', loginRoute);

app.get('/users', function(req, res) {

  let username = req.query.username;
  if(username) {
    let query = 'SELECT * from users where username = ?';
    console.log(query);
    connection.query(query, [username], function (err, rows, fields) {
      if (err) {
        console.log(500);
        return res.status(500).send({
          message: 'INTERNAL SERVER ERROR'
        });
      }

      if(rows[0]) {
        console.log(200);
        console.log('Returning user: ', rows[0]);
        res.setHeader('Content-Type', 'application/json');
        return res.send(JSON.stringify(rows[0]));
      } else {
        console.log(404);
        return res.status(404).send({
          message: 'Username not found'
        })
      }
    })
  } else {
    console.log(400);
    return res.status(400).send({
      message: 'Error: query param \'username\' is required'
    })
  }
  console.log('end')
})

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// })

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(443);
