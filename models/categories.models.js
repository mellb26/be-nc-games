const connection = require('../db/connection')
const format = require('pg-format')
const testData = require("../db/data/test-data/index")

exports.addCategories = () => {
    return connection.query(`SELECT * FROM categories;`).then((result) => {
        return result.rows
             })
}

