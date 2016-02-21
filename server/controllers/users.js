const ObjectID = require('mongodb').ObjectID;
const UsersSvc = require('./../services/users');

module.exports.searchUsers = (req, res, next) => {
    UsersSvc.queryUsers({}).then((result) => {
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

module.exports.getUser = (req, res, next) => {
    var query = {};
    query._id = new ObjectID(req.params.id);

    UsersSvc.queryUsers(query).then((result) => {
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