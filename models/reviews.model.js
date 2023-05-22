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

 exports.newComments = (review_id) => {
   return connection
     .query(`SELECT * FROM reviews WHERE review_id = $1`, [review_id])
     .then((result) => {
       if (result.rows.length === 0) {
         return Promise.reject({
           status: 404,
           msg: "review not found",
         });
       }
       return result.rows[0];
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

exports.addComments = (review_id) => {
    console.log(review_id)
    return connection
      .query(
        `SELECT * FROM comments WHERE review_id = $1 ORDER BY comments.created_at DESC`,
        [review_id]
      )
      .then((result) => {

        if (result.rows.length === 0) {
            return Promise.reject({
                status: 404,
                msg: `no comment found for ${review_id}`
            })
        }
        return result.rows;
      });
}
exports.newComments = (review_id, comments) => {
  const { username, body } = comments;
  if (username === false && body === false) {
    return Promise.reject({ status: 400 });
  }
  return connection
    .query(`INSERT INTO comments
    (body, review_id, author)
    VALUES
    ($1, $2, $3)
    RETURNING *`,[body, review_id, username])
    .then((result) => {
      return result.rows[0]
    })
}

exports.newPatch = (review_id, updated) => {
  return connection.query(`
    UPDATE reviews
    SET
    votes = votes + $1
    WHERE 
    review_id = $2
    RETURNING *`, [updated.inc_vote, review_id]).then((result) => {
    console.log(result)
   return result.rows[0]
    }).catch((err) => {
        return Promise.reject(err)
    })
}

