const { addReviews, addSortBy } = require("../models/reviews.model")

exports.getReviews = (request, response, next) => {
    const { review_id } = request.params;
  addReviews(review_id)
      .then((reviewsArray) => {
      response.status(200).send({ review: reviewsArray });
    })
      .catch((err) => {
          next(err)
    })
};
exports.getSorted = (request, response, next) => {
  addSortBy()
      .then((reviewsArray) => {
      response.status(200).send({ reviews: reviewsArray });
    })
    .catch((err) => {
      next(err);
    });
};


