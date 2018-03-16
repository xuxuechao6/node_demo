var express = require('express');
var router = express.Router();
var oauthServer = require('../controllers/oauth2server/oauthserver')
/* GET users listing. */

router.post('/authorize', function(req, res, next) {
    console.log(req.body)
    oauthServer.authorizeHandler(req, res);
});

router.get('/login', function(req, res, next) {
    oauthServer.authorizeHandler(req, res);
});

module.exports = router;
