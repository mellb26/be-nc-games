const express = require('express');
const { getCategories} = require('./controllers/categories.controller')
const { getEndpoints } = require('./controllers/endPoints.controller');
const { getReviews } = require('./controllers/reviews.controller');
const app = express()
app.use(express.json());

app.get('/api/categories', getCategories)
app.get('/api', getEndpoints)
app.get('/api/reviews/:review_id', getReviews);

app.use((req, res, next) => {
    res.status(404).send({ msg: "404 not found" });
})

app.use((err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({msg: "Bad Request"})
    }
})
app.use((err, req, res, next) => {
  console.log(err);
    res.status(500).send({ msg: "Server Error!" });
});
app.use((err, req, res, next) => {
    console.log(err)
})
module.exports = app;