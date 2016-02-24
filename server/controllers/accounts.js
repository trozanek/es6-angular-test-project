'use strict';

const ObjectID = require('mongodb').ObjectID;
const AccountsSvc = require('./../services/accounts');
const Mailgun = require('mailgun').Mailgun;

module.exports.searchAccounts = (req, res, next) => {
    AccountsSvc.queryAccounts({}).then((result) => {
        if (result.length > 0) {
             let response = {
                result: result
            }; 
            res.send(response);    
        } else {
            res.status(204);
            res.send();
        }
    }).catch((err) => {
        next(err);
    });
} 

module.exports.getAccount = (req, res, next) => {
    let query = {};
    query._id = new ObjectID(req.params.id);

    AccountsSvc.queryAccounts(query).then((result) => {
        if (result.length > 0) {
            let response = {
                result: result[0]
            };    
            res.send(response);    
        } else {
            res.status(204);
            res.send();
        }
    }).catch((err) => {
        next(err);
    });
} 

module.exports.updateAccount = (req, res, next) => {
    let query = {};
    let update = {};
    let featuresPayload = req.body.features;
    let order = req.body.order;
    
    if (featuresPayload) {
        query._id = new ObjectID(req.params.id);
    
        update = {
            $set: {
                features: featuresPayload
            }
        };
        
        AccountsSvc.updateAccounts(query, update).then((result) => {
            let response = {
                result: result
            }; 
            res.status(200);
            res.send(response);
        }).catch((err) => {
            if (err) {
                next(err);
                return;
            }
        });    
    } else if (order) {
        let mg = new Mailgun('key-6efb1375e397f54843cd62d982712d1d');
        mg.sendText('tomasz@rozanek.pl', ['herunohazumi@gmail.com','addons-test@mailinator.com'],
            `Premium order for account ${order.user.accountId}`,
            `User ${order.user.firstName} ${order.user.lastName} ordered ${order.action ? 'activation ' : 'disactivation'} of \
            premium addon ${order.addon.name} for ${order.user.accountId} account`,
            {},
            function(err) {
                if (err, response) {
                    console.log('Oh noes: ' + err);
                    res.status(500);
                    res.send();
                } else {
                    console.log(response)
                    res.status(200);
                    res.send();
                }
            }
        );
        
    } else {
        res.status(400);
        res.send('Payload required');
    }
    
}