let express = require('express');
let router = express.Router();
//let parser = require('accept-language-parser'); // TODO
//https://www.npmjs.com/package/accept-language-parser

let bodyParser = require('body-parser');

let i18n = require("../modules/i18n");

router.get('/language/:language', function(req, res) {
    console.log(req.headers["accept-language"] );
    let lables = i18n(req.params.language);
    if (lables) {
        res.writeHead(200, "Ok", {"Context-Type": "json/plain"});
        res.end(JSON.stringify(lables));
    } else {
        res.status(404).end();
    }
});


module.exports = router;
