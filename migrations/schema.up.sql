

/* This is my users table */
CREATE TABLE users
(
    user_id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    admin SMALLINT
);

/* This is my posts table */
CREATE TABLE articles
(
    article_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id),
    pDate DATE NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT NOT NULL
);

/* This is my tags table which adds tags to my posts */
CREATE TABLE tags
(
    tag_id SERIAL NOT NULL PRIMARY KEY,
    body TEXT NOT NULL
);

/* This links the posts and tags table together */
CREATE TABLE article_tags
(
    article_tags_id SERIAL NOT NULL PRIMARY KEY,
    article_id INT NOT NULL REFERENCES articles(article_id),
    tag_id INT NOT NULL REFERENCES tags(tag_id)
);

/* This table is the comments table */
CREATE TABLE comments
(
    comment_id SERIAL NOT NULL PRIMARY KEY,
    article_id INT NOT NULL REFERENCES articles(article_id),
    cdate DATE NOT NULL,
    body TEXT NOT NULL
);