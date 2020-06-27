var express = require('express');
var router = express.Router();

//pg config
var pg = require('pg');
var conString = process.env.DATABASE_URL || 'postgres://@localhost/scriptureblog';

/* GET users listing. */
//Users
//get all users
router.get('/', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM users', function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});

//post user
router.post('/', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('INSERT INTO users(username, password) VALUES($1, $2) returning id', [req.body.username, req.body.password], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});

//get one user
router.get('/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('SELECT * FROM users WHERE user_id = $1', [req.params.id], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});
// update user
router.put('/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        //compare with .compareSync(req.body.data.attributes.password, storedPW)
        client.query('UPDATE users SET username = $2, password = $3  WHERE user_id = $1', [req.params.id, req.body.username, req.body.password], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});
//delete one user
router.delete('/:id', function (req, res, next) {
    pg.connect(conString, function (err, client, done) {
        console.log(conString)
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        console.log("connected to database");
        client.query('DELETE FROM users WHERE id = $1', [req.params.id], function (err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            res.send(result);
        });
    });
});

module.exports = router;
