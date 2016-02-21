const mongoAdapter = require('./../db/mongo');

module.exports.queryUsers = (query) => {
    return new Promise((resolve, reject) => {
        mongoAdapter.db.collection('users').find(query).toArray((err, result) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        }); 
    });   
}