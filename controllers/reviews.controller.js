const { addReviews } = require("../models/reviews.model")

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


