import express from 'express';
import mysql from 'mysql';
import config from '../config'
import {genJWT, validateToken} from '../auth';

let router = express.Router();

let connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

router.post('/', function(req, res) {
    let userId = req.user.id;
    let {date, lessThanFifteen, greaterThanFifteen, limitedEnglishProficiency, totalForms} = req.body; 

    if(!date || !lessThanFifteen || !greaterThanFifteen || !limitedEnglishProficiency || !totalForms) {
        res.status(400).send('Missing required post param')
    }

    let query = 'INSERT INTO ioaForms ' +
                '(user_id, date, less_than_fifteen, greater_than_fifteen, limited_english_proficiency, total_forms)' +
                'VALUES (?, ?, ?, ?, ?, ?)' 
    let params = [userId, date, lessThanFifteen, greaterThanFifteen, limitedEnglishProficiency, totalForms];
    connection.query(query, params, function (err, results, fields) {
        if(err) {
          console.log(err);
          console.log(500);
          return res.status(500).send({
            message: 'INTERNAL SERVER ERROR'
          });
        } 

        if(results.affectedRows) {
          console.log(204);
          return res.status(204).send()
        } else {
          console.log(500);
          return res.status(500).send({
            message: 'Error inserting row'
          })
        }
    })
})
export default router;