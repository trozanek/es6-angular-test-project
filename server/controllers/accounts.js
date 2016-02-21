const ObjectID = require('mongodb').ObjectID;
const AccountsSvc = require('./../services/accounts');

module.exports.searchAccounts = (req, res, next) => {
    AccountsSvc.queryAccounts({}).then((result) => {
        if (result.length > 0) {
            res.send(result);    
        } else {
            res.status(204);
            res.send();
        }
    }).catch((err) => {
        next(err);
    });
} 

module.exports.getAccount = (req, res, next) => {
    var query = {};
    query._id = new ObjectID(req.params.id);

    AccountsSvc.queryAccounts(query).then((result) => {
        if (result.length > 0) {
            res.send(result[0]);    
        } else {
            res.status(204);
            res.send();
        }
    }).catch((err) => {
        next(err);
    });
} 

module.exports.updateAccount = (req, res, next) => {
    var query = {};
    var update = {};
    var featuresPayload = req.body.features;
    
    query._id = new ObjectID(req.params.id);
    
    update = {
        $set: {
            features: featuresPayload
        }
    };
    
    AccountsSvc.updateAccounts(query, update).then((result) => {
        res.status(200);
        res.send(result);
    }).catch((err) => {
        if (err) {
            next(err);
            return;
        }
    });
}