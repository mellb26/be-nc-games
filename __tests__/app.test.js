const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const connection = require("../db/connection");
const app = require('../app.js');
const testData = require('../db/data/test-data')
beforeEach(() => seed(testData))
afterAll(() => connection.end());

describe('api test suite', () => {
    test('GET - /api/categories returns an array of objects with slug and description properties', () => {
        return request(app)
            .get('/api/categories')
            .expect(200)
            .then((response) => {
                const result = response.body
                result.categories.forEach((category) => {
                    expect(typeof category.slug).toBe('string');
                    expect(typeof category.description).toBe('string');
                })
                expect(result.categories.length).toBe(4)
            })
    })
    describe.only("api errors", () => {
        test("status: 404, responds with an error message when passed a route  that does not exist", () => {
            return request(app)
                .get("/api/NotFound")
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toEqual("404 not found")
                })
        })
        
        })
})
 

//     test("status: 400, responds with an error message when passed an invalid input", () => {
        //       return request(app)
        //         .get("/invalid")
        //         .expect(400)
        //         .then(({ body }) => {
        //           expect(body.msg).toEqual("Invalid input")
        //         })
        //     })
        // test("status: ")