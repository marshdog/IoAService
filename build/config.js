'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var databaseCredentials = function () {
    var url = process.env.DATABASE_URL;
    if (url) {

        // deliminiting symbols in heroku's DATABASE_URL environemnt variable
        var colon = url.indexOf(':', 8);
        var atSign = url.indexOf('@', colon);
        var slash = url.indexOf('/', atSign);
        var questionMark = url.indexOf('?', slash);

        // clearDB database credentials get extracted from DATABASE_URL
        var host = url.substring(atSign + 1, slash);
        var user = url.substring(8, colon);
        var password = url.substring(colon + 1, atSign);
        var database = url.substring(slash + 1, questionMark);

        console.log('host: ' + host);
        console.log('user: ' + user);
        console.log('password: ' + password);
        console.log('database: ' + database);

        if (host && user && password && database) {
            return {
                host: host,
                user: user,
                password: password,
                database: database
            };
        }
    }

    // local database credentials
    return {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ioa'
    };
}();

exports.default = _extends({}, databaseCredentials);