const express = require('express');
const router = express.Router();
const oauthServer = require('../controllers/oauth2server/oauthserver')


// Passport configuration
require('../middlewares/auth');

/* GET users listing. */
// router.get('/authorize', function (req,res) {
//     console.log(11111111111)
// });



router.get('/authorize', oauthServer.authorization);


module.exports = router;
