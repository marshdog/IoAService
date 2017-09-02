import loginRoute from './routes/login';
import tallyRoute from './routes/tally';
import fs from 'fs';
import http from 'http';
import https from 'https';
import express from 'express';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import {validateToken} from './auth.js';

let privateKey  = fs.readFileSync('sslcert/key.pem');
let certificate = fs.readFileSync('sslcert/cert.pem');

let credentials = {key: privateKey, cert: certificate};
let app = express();

const verifyAuthHeader = (req, res, next) => {
    let jwt = req.header('authorization');
    if(jwt) {
        let user = validateToken(jwt)
        if(user) {
            req.user = user;
            return next();
        }
    }
    return res.status(403).send('Invalid JSON Web Token');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/login', loginRoute);
app.use('/tally', verifyAuthHeader, tallyRoute);

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(process.env.PORT || 8080);
// httpsServer.listen(443);
