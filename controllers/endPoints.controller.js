const { checkEndpoints } = require('../models/endPoints.model') 
const fs = require('fs/promises')


exports.getEndpoints = (request, response, next) => {
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf8').then((data) => {
        const endpoints = JSON.parse(data);
        response.status(200).send({ 'endPoints': endpoints })

    }).catch((err) => {
    next(err)
})
}