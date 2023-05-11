const { addCategories } = require('../models/categories.models')

exports.getCategories = (request, response, next) => {
    addCategories()
      .then((categoryArray) => {
        response.status(200).send({ categories: categoryArray });
      })
      .catch((err) => {});
}


