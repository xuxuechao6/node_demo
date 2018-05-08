const express = require('express');
const router = express.Router();
const oauthServer = require('../controllers/oauth2server/oauthserver')


// Passport configuration
//require('../middlewares/auth');

/* GET users listing. */
// router.get('/authorize', function (req,res) {
//     console.log(11111111111)
// });



const logs = function(){
    return function (req,res ,next) {
        console.log("中间键：",req.query)
        console.log("路径：",req.url)
        console.log("路径：",req.headers)
        next();
    }
};
//oauth2.0 登录流程
router.get('/authorize', oauthServer.authorization);
router.post('/token',logs(), oauthServer.token,
    function(req, res) {
        res.json(req.user);
    });

router.get('/login',function (req,res) {
    console.log("000",req.query)
    oauthServer.checkClientInfo(req,res)
} );

module.exports = router;
