const mongoAdapter = require('./../db/mongo');

module.exports.queryAccounts = (query) => {
    return new Promise((resolve, reject) => {
        mongoAdapter.db.collection('accounts').find(query).toArray((err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }); 
    });   
}

module.exports.updateAccounts = (query, update) => {
    return new Promise((resolve, reject) => {
        mongoAdapter.db.collection('accounts').update(query, update, (err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}