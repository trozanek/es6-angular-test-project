'use strict';

const mongoAdapter = require('./../db/mongo');

module.exports.queryAddons = (query) => {
    return new Promise((resolve, reject) => {
        mongoAdapter.db.collection('addons').find(query).toArray((err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }); 
    });   
}

module.exports.addAddon = (query, update) => {
    return new Promise((resolve, reject) => {
        mongoAdapter.db.collection('addons').insert(query, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}