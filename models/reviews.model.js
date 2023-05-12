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

 exports.addSortBy = () => {
     return connection
       .query(
        `SELECT reviews.review_id, reviews.title,reviews.designer, reviews.owner, reviews.review_img_url,
reviews.category, reviews.created_at, reviews.votes,
COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at;`
       )
         .then((result) => {
           if (result.rows.length === 0) {
             return Promise.reject({
               status: 404,
               msg: "Not found",
             });
           }
       return result.rows
       });
 };