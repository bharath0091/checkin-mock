let express = require('express');
let router = express.Router();
let Status = require("../modules/model/status");
let database = require("../modules/database");

function databaseInsert(req, res, next) {
    database.insertOneDocument("reservation", req.body, (err, result) => {
        err ? next(new Status(500, "Database update failed")) : res.end();
    });
}

router.post('/', function(req, res, next) {
    let contentType = req.headers['content-type'];
    if (contentType && contentType.indexOf('application/json') !== -1) {
        databaseInsert(req, res, next);
    } else {//bad request
        next(new Status(400, "Expecting application/json content type"));
    }
});

module.exports = router;
