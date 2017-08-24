import loginRoute from './routes/login';
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';

let privateKey  = fs.readFileSync('sslcert/key.pem');
let certificate = fs.readFileSync('sslcert/cert.pem');

let credentials = {key: privateKey, cert: certificate};
let app = express();

app.use(bodyParser.json());
app.use('/login', loginRoute);

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(443);
