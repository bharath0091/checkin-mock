let express = require('express');
let router = express.Router();
let Status = require("../modules/model/status");
let Message = require("../modules/model/message");
let database = require("../modules/database");

function validateReservation(req, res, next) {
    let reqReservation = req.body;
    if(reqReservation.bookingCode) {
        database.getDocumentByFieldName("reservation", "bookingCode", reqReservation.bookingCode, (err, dbReservation) => {
            err ? next(new Status(500, "Database call failed")) :
                validateFields(reqReservation, dbReservation, res, next);
        });
    } else {
        next(new Status(400, new Message(9001, "Invalid Booking code")));
    }
}

function validateFields(reqReservation, dbReservation, res, next) {
    if(reqReservation.familyName === dbReservation.familyName) {
        next(new Status(400, new Message(9002, "Family name invalid")));
    } else if((Math.abs(dbReservation.departureDateAndTime - new Date()) / 36e5) > 24) { // beyond 24 hours
        next(new Status(400, new Message(9003, "Check-in not available yet for this flight")));
    } else if((Math.abs(dbReservation.departureDateAndTime - new Date()) / 36e5) < 1) { // less than one hour for departure
        next(new Status(400, new Message(9004, "Sorry online check-in closed for this flight")));
    } else {
        res.status(200).json({"message" : "Check-in successful"});
    }
}

router.post('/', function(req, res, next) {
    let contentType = req.headers['content-type'];
    if (contentType && contentType.indexOf('application/json') !== -1) {
        validateReservation(req, res, next);
    } else {//bad request
        next(new Status(400, "Expecting application/json content type"));
    }
});

module.exports = router;
