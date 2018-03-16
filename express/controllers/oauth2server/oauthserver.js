var oauthServer = require('oauth2-server');
var Request = oauthServer.Request;
var Response = oauthServer.Response;

// const User = db.User;

// var oauth = new oauthServer({
//     // model: require('./models.js'),
//     // authenticateHandler: {
//     //     handle: function(req, res){
//     //         // console.log("new handler")
//     //         return User.findOne({username: req.query.username})
//     //             .then(function(user){
//     //                 console.log(user)
//     //                 return user
//     //             })
//     //             .catch( function(err){
//     //             console.log("Err: find User",err);
//     //     })
//     //         // Whatever you need to do to authorize / retrieve your user from post data here
//     //         // return {user: req.query.username};
//     //     }
//     // },
//     // allowEmptyState: true,
//     // accessTokenLifetime: 30 * 24 * 60 * 60,
// });

function authorizeHandler(req, res, options) {
    // console.log("authorizeHandler: ",req.url);
    // var request = new Request(req);
    // var response = new Response(res);
    // return oauth.authorize(request, response, options)
    //     .then(function(code) {
    //         console.log("finish authorization: ",code);
    //         // res.locals.oauth = {code: code};
    //         res.send({code: code})
    //         next();
    //     })
    //     .catch(function(err) {
    //         // handle error condition
    //     });
}

function handleToken(req, res, options) {
    // var request = new Request(req);
    // var response = new Response(res);
    // return oauth.token(request, response, options)
    //     .then(function(token) {
    //         res.locals.oauth = {token: token};
    //         res.header('Access-Control-Allow-Origin', '*');
    //         res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //         res.header('Access-Control-Allow-Headers', 'accept, content-type, x-parse-application-id, x-parse-rest-api-key, x-parse-session-token');
    //         res.send(token);
    //         request.post(config.token_destination, {form: token});
    //     })
    //     .catch(function(err) {
    //         console.log("tokenHandler Err: ",err);
    //         // handle error condition
    //     });
}

//==============================================
module.exports = {
    authorizeHandler:authorizeHandler,
    handleToken: handleToken,

};
