const express = require('express');
const { getCategories} = require('./controllers/categories.controller')
const { getEndpoints } = require('./controllers/endPoints.controller');
const { getReviews, getSorted, getComments, postComments, patchReview } = require('./controllers/reviews.controller');
const cors = require("cors");
const app = express()
app.use(cors());
app.use(express.json());

app.get('/api/categories', getCategories)
app.get('/api', getEndpoints)
app.get('/api/reviews/:review_id', getReviews);
app.get('/api/reviews', getSorted)
app.get('/api/reviews/:review_id/comments', getComments)
app.post('/api/reviews/:review_id/comments', postComments) 
app.patch('/api/reviews/:review_id', patchReview)

app.use('*', (req, res) => {
    res.status(404).send({msg: '404 not found'})
})
app.use((err, req, res, next) => {
    if (err.code === "22P02") {
      res.status(400).send({ msg: "400 Bad Request" });
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "Not Found" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
    console.log(err);
    if (err) {
        res.status(err.status).send(err)
    } else {
        next(err)
    }
})
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: "Server Error!" });
})
module.exports = app;