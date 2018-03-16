var Client = require('../models/client');


var getClients = function(req, res) {
    Client.find({userId: req.user._id}, function(err, clients) {
        if (err) {
            res.json({messag: 'error', data: err});
            return;
        }

        res.json({message: 'done', data: clients});
    });
};

module.exports = {
    getClients: getClients
};