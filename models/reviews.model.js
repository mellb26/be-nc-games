const connection = require("../db/connection");
const format = require("pg-format");
const testData = require("../db/data/test-data/index");

 exports.addReviews = (review_id) => {
    
   return connection
     .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
       .then((result) => {
        
         if (result.rows.length === 0) {
             return Promise.reject({
                 status: 404,
                 msg: "review not found"
         })
         }
         return result.rows[0] 
     });
 };