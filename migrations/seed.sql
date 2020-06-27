-- INSERT INTO
--   users
-- VALUES
--     ( default, 'Wayne Herridge', 'password', 1),
--     ( default, 'John Applegate', 'avocados', 0),
--     ( default, 'Sally Rallycaps', 'sevendoors', 0),
--     ( default, 'Tia Mamamia', 'redsuits', 0);

INSERT INTO
  articles
VALUES
    ( default, (SELECT user_id
        FROM users
        WHERE user_id = 1), '2020-06-20', 'blog post1', 'When hippos are upset, their sweat turns red.'),
    ( default, (SELECT user_id
        FROM users
        WHERE user_id = 2), '2020-06-20', 'blog post2', 'If you lift a kangaroo’s tail off the ground it can’t hop.'),
    ( default, (SELECT user_id
        FROM users
        WHERE user_id = 4), '2020-06-20', 'blog post3', 'If you consistently fart for 6 years & 9 months, enough gas is produced to create the energy of an atomic bomb!'),
    ( default, (SELECT user_id
        FROM users
        WHERE user_id = 3), '2020-06-20', 'blog post4', 'The average woman uses her height in lipstick every 5 years.');