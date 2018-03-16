'use strict';

// Register supported grant types.
//
// OAuth 2.0 specifies a framework that allows users to grant client
// applications limited access to their protected resources.  It does this
// through a process of the user granting access, and the client exchanging
// the grant for an access token.

const db          = require('../../models/clients');
const oauth2orize = require('oauth2orize');
const login       = require('connect-ensure-login');

// create OAuth 2.0 server
const server = oauth2orize.createServer();



exports.authorization = [
    login.ensureLoggedIn(),
    server.authorization((clientID, redirectURI, scope, done) => {
        console.log(333)
        db.clients.findByClientId(clientID)
        .then((client) => {
        if (client) {
            client.scope = scope; // eslint-disable-line no-param-reassign
        }
        // WARNING: For security purposes, it is highly advisable to check that
        //          redirectURI provided by the client matches one registered with
        //          the server.  For simplicity, this example does not.  You have
        //          been warned.
        return done(null, client, redirectURI);
})
.catch(err => done(err));
}), (req, res, next) => {
    // Render the decision dialog if the client isn't a trusted client
    // TODO:  Make a mechanism so that if this isn't a trusted client, the user can record that
    // they have consented but also make a mechanism so that if the user revokes access to any of
    // the clients then they will have to re-consent.
    db.clients.findByClientId(req.query.client_id)
        .then((client) => {
        if (client != null && client.trustedClient && client.trustedClient === true) {
        // This is how we short call the decision like the dialog below does
        server.decision({ loadTransaction: false }, (serverReq, callback) => {
            callback(null, { allow: true });
    })(req, res, next);
    } else {
        res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client });
    }
})
.catch(() =>
    res.render('dialog', { transactionID: req.oauth2.transactionID, user: req.user, client: req.oauth2.client }));
}];
