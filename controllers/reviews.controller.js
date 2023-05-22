const { addReviews, addSortBy, addComments, newComments, newPatch} = require("../models/reviews.model")

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

exports.postComments = (request, response, next) => {
  const review_id = request.params.review_id;
  const comment = request.body;
  return newComments(review_id, comment).then((result) => {
    response.status(201).send({ comment: result });
    })
    .catch((err) => {
      next(err);
    });
};
exports.patchReview = (request, response, next) => {
  const { review_id }  = request.params
  const updated = request.body;
  return newPatch(review_id, updated)
    .then((result) => {
      response.status(200).send({ review: result });
       console.log('in controller')
    })
    .catch((err) => {
      next(err);
    });
}


