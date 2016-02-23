'use strict';

const Db = require('mongodb').Db;
const Server = require('mongodb').Server;
const config = require('./../config.json');
const dbName = config.mongo.dbName;
var dbPort = config.mongo.port;
var dbHost = config.mongo.host;
var db;

if (process.env.MONGO_PORT) {
    var dockerMongo = process.env.MONGO_PORT.split(':')
    dbHost = dockerMongo[1].replace('//', '');
    dbPort = dockerMongo[2]; 
    console.log(dbHost);
}

module.exports.InitDB = function () {
    return new Promise((resolve, reject) => {
        module.exports.db = db = new Db(dbName, new Server(dbHost, dbPort, {}, {}), { safe: false, auto_reconnect: true });

        db.open(function (e, d) {
            if (e) {
                console.log(e);
                reject(e);
            } else {
                console.log(`connected to ${dbName} database at ${dbHost} : ${ dbPort } `);
                resolve();
            }
        }); 
    });
}

module.exports.Disconnect = function () {
    return new Promise((resolve, reject) => {
        if (db) {
            db.close();
            resolve();
        }  
    })
}

