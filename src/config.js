const databaseCredentials = (() => {
    let url = process.env.DATABASE_URL; 
    if(url) {
        // deliminiting symbols in heroku's DATABASE_URL environemnt variable
        let colon = url.indexOf(':', 8);
        let atSign = url.indexOf('@', colon);
        let slash = url.indexOf('/', atSign);
        let questionMark = url.indexOf('?', slash);

        // clearDB database credentials get extracted from DATABASE_URL
        let host = url.substring(atSign + 1, slash);
        let user = url.substring(8, colon);
        let password = url.substring(colon + 1, atSign);
        let database = url.substring(slash +1, questionMark);
       
        if(host && user && password && database) {
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