'use strict';

const ObjectID = require('mongodb').ObjectID;
const AddonsSvc = require('./../services/addons');

module.exports.getNewAddons = (req, res, next) => {
    AddonsSvc.queryAddons({new: true}).then((result) => {
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

module.exports.addNewAddon = (req, res, next) => {
    let query = {
        id: req.params.id,
        new: true
    }
    AddonsSvc.addAddon(query).then((result) => {
        if (result.length > 0) {
            res.send(result);    
        } else {
            res.status(201);
            res.send();
        }
    }).catch((err) => {
        next(err);
    });
} 