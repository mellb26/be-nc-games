\c nc_games_test;
-- SELECT reviews.*, COUNT(comments.review_id) AS comment_count FROM reviews
--     LEFT JOIN comments ON reviews.review_id = comments.review_id
--     GROUP BY reviews.review_id
--     ORDER BY created_at;

SELECT reviews.review_id, reviews.title, reviews.designer, reviews.owner, reviews.review_img_url,
reviews.category, reviews.created_at, reviews.votes,
COUNT(comments.review_id) AS comment_count FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at;

