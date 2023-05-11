const connection = require("../db/connection");
const format = require("pg-format");
const testData = require("../db/data/test-data/index");
const fs = require('fs/promises')

exports.checkEndpoints = () => {
    return fs.readFile('${__dirname}/../endpoints.json', 'utf8').then((response) => {
        const endpoint = JSON.parse(response)
        return endpoint;
    })
};
