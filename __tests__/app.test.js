const request = require("supertest");
const seed = require("../db/seeds/seed.js");
const connection = require("../db/connection");
const app = require("../app.js");
const testData = require("../db/data/test-data");
beforeEach(() => seed(testData));
afterAll(() => connection.end());

describe("api test suite", () => {
  test("GET - /api/categories returns an array of objects with slug and description properties", () => {
    return request(app)
      .get("/api/categories")
      .expect(200)
      .then((response) => {
        const result = response.body;
        result.categories.forEach((category) => {
          expect(typeof category.slug).toBe("string");
          expect(typeof category.description).toBe("string");
        });
        expect(result.categories.length).toBe(4);
      });
  });
});
describe("GET api", () => {
  test("GET - /api/ returns a JSON object containing endpoint information", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        expect(response.body.endPoints.hasOwnProperty("GET /api")).toBe(true);
        expect(
          response.body.endPoints.hasOwnProperty("GET /api/categories")
        ).toBe(true);
        expect(typeof response).toBe("object");
        Object.keys(response.body.endPoints).forEach((endpoint) => {
          expect(endpoint).hasOwnProperty("description");
          expect(endpoint).hasOwnProperty("queries");
          expect(endpoint).hasOwnProperty("exampleResponse");
        });
      });
  });
});
test("GET - /api/reviews/review_id returns an array of objects with 9 properties", () => {
  return request(app)
    .get("/api/reviews/1")
    .expect(200)
    .then((response) => {
        const { review } =  response.body;
        expect(review.review_id).toBe(1)
        expect(typeof review.review_id).toBe("number");
        expect(typeof review.designer).toBe('string');
        expect(typeof review.owner).toBe('string');
        expect(typeof review.review_img_url).toBe('string');
        expect(typeof review.review_body).toBe('string');
        expect(typeof review.category).toBe('string');
        expect(typeof review.created_at).toBe('string');
        expect(typeof review.votes).toBe('number')

    });
});

describe("api errors", () => {
    test("status: 404, responds with an error message when passed a route that does not exist", () => {
        return request(app)
            .get("/api/category/NotFound")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).toEqual("404 not found");

            });
    });
})
    test("status: 404, responds with an error message when passed an invalid ID", () => {
        return request(app)
            .get("/api/reviews/99999")
            .expect(404)
            .then(({body}) => {
                
                expect(body.msg).toEqual("review not found");
            })
    })



    

