const { addReviews, addSortBy, addComments } = require("../models/reviews.model")

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
      next(err)
    })
}
exports.getComments = (request, response, next) => {
    const review_id = request.params.review_id
  addComments(review_id)
    .then((comments) => {
      response.status(200).send({ comments: comments });
    })
    .catch((err) => {
      next(err);
    });
};


