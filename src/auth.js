import base64url from 'base64url'
import crypto from 'crypto'

const getEnv = (key) => {
    let val = process.env[key];
    if(!val) {
        throw 'Missing required environment var \"' + key + '\"'
    } 
    return val
}

const headerJson = {
    alg: "HS256",
    typ: "JWT" 
}
const encodedHeader = base64url(JSON.stringify(headerJson));

export const genJWT = (payload) => {
    let encodedPayload = base64url(JSON.stringify(payload));
    let secret = getEnv('IOA_SECRET');
    let signature = crypto.createHmac('sha256', secret)
                          .update(encodedHeader + "." + encodedPayload)
                          .digest('hex');
    let jwt = encodedHeader + '.' + encodedPayload + '.' + signature
    console.log('Generated JWT: ' + jwt);
    return jwt
}

export const validateToken = (jwt = '') => {
    let firstDot = jwt.indexOf('.');
    let secondDot = jwt.indexOf('.', firstDot + 1);
    if(!firstDot || !secondDot) {
        return null
    }

    let encodedHeader = jwt.substring(0, firstDot);
    let encodedPayload = jwt.substring(firstDot + 1, secondDot);
    let signature = jwt.substring(secondDot + 1);
    if(!encodedHeader || !encodedPayload || !signature) {
        return null
    }

    let secret = getEnv('IOA_SECRET');
    let signature2 = crypto.createHmac('sha256', secret)
                           .update(encodedHeader + "." + encodedPayload)
                           .digest('hex');
    if(signature !== signature2) {
        return null
    }    

    let payloadJson = base64url.decode(encodedPayload);
    let payload
    try {
        payload = JSON.parse(payloadJson)
    } catch(e) {
        return null        
    }
    return payload; 
}