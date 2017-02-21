var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
router.use(bodyParser.json());

let i18n = require("../i18n");

router.get('/language/:language', function(req, res) {
    var a = null;
    a.toString();
    let lables = i18n(req.params.language);
    if (lables) {
        res.writeHead(200, "Ok", {"Context-Type": "json/plain"});
        res.end(JSON.stringify(lables));
    } else {
        res.status(404).end();
    }
});


module.exports = router;
