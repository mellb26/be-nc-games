const connection = require("../db/connection");
const format = require("pg-format");
const testData = require("../db/data/test-data/index");

 exports.addReviews = (review_id) => {
    console.log('inside model')
   return connection
     .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
     .then((result) => {
       return result.rows[0];
     });
 };