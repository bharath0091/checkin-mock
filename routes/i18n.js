var express = require('express');
var router = express.Router();

let i18n = require("../i18n");

router.get('/:language', function(req, res) {
    let lables = i18n(req.params.language);
    if (lables) {
        res.writeHead(200, "Ok", {"Context-Type": "json/plain"});
        res.end(lables);
    } else {
        res.status(404).end();
    }
})


module.exports = router;
