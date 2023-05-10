const express = require('express');
const { getCategories } = require('./controllers/categories.controller')
const app = express()
app.use(express.json());

app.get('/api/categories', getCategories)

app.use((req, res, next) => {
    res.status(404).send({ msg: "404 not found" });
});
app.use((err, req, res, next) => {
    if (err.status && err.msg) {
        res.send(err.status).send({msg: err.msg})
    }
})

app.use((err, req, res, next) => {
    if (err.code === '23503') {
        res.status(404).send({msg: "not found"})
    }
})
app.use((err, req, res, next) => {
  console.log(err);
    res.status(500).send({ msg: "Server Error!" });
});
app.use((err, req, res, next) => {
    console.log(err)
})
// app.use((err, req, res, next) => {
//   if (err.code === "22P02") {
//     res.status(400).send({ msg: "Invalid input" });
//   } else next(err);
// })
module.exports = app;