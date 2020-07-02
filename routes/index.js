var express = require('express');
var router = express.Router();

//pg config
var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://@localhost/scriptureblog';

//-------------
//Posts
//get all posts
router.get('/', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM articles', function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            console.log(result);
            res.render('index', {
                'articles': result.rows
            });
        });
    });
});

router.get('/articles/create', function (req, res, next) {
    res.render('addArticle', {
        'formAction': '/articles',
        'formMethod': 'POST'
    });
});

// add a post
router.post('/articles', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('INSERT INTO articles(user_id, body) VALUES($1, $2) RETURNING *', [req.body.user_id, req.body.body], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.json(result);
        });
    });
});

//get one post
router.get('/articles/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM articles WHERE article_id = $1', [req.params.id], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});

// Edit Post Form
router.get('/articles/edit/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM articles WHERE article_id = $1', [req.params.id], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.render('editArticle', {
                'article': result,
                'formAction': '/articles/',
                'formMethod': 'PUT'
            });
        });
    });
});

// update one post
router.put('/articles/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('UPDATE articles SET user_id = $2, body = $3  WHERE article_id = $1', [req.params.id, req.body.user_id, req.body.content], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});
//delete one post
router.delete('/articles/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        console.log(conString)
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('DELETE FROM articles WHERE id = $1', [req.params.id], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});

module.exports = router;