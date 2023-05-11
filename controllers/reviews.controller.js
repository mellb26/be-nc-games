const { addReviews } = require("../models/reviews.model")

exports.getReviews = (request, response, next) => {

    const { review_id } = request.params;
    console.log(review_id)
  addReviews(review_id)
    .then((reviewsArray) => {
      response.status(200).send({ review: reviewsArray });
    })
      .catch((err) => {
          console.log(err)
          next(err)
          
    })
};
