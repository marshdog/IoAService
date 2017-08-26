const databaseCredentials = (() => {
    let url = process.env.DATABASE_URL; 
    if(url) {

        // deliminiting symbols in heroku's DATABASE_URL environemnt variable
        let colon = url.indexOf(':', 8);
        let atSign = url.indexOf('@', colon);
        let slash = url.indexOf('/', atSign);
        let questionMark = url.indexOf('?', slash);

        // clearDB database credentials get extracted from DATABASE_URL
        let host = url.substring(atSign, slash);
        let user = url.substring(8, colon);
        let password = url.substring(colon, atSign);
        let database = url.substring(slash, questionMark);
       
        console.log('host: ' + host);
        console.log('user: ' + user);
        console.log('password: ' + password);
        console.log('database: ' + database);

        if(host && username && password && database) {
            return {
                host,
                user,
                password,
                database
            }
        } 
    }

    // local database credentials
    return {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'ioa'
    }
})()

export default 
{
   ...databaseCredentials
}