'use strict';
   
const express = require('express');

const accountsCtrl = require('./controllers/accounts');
const usersCtrl = require('./controllers/users');
const addonsCtrl = require('./controllers/addons');

const router = express.Router();

// Routes

router.get('/', getRoot);
router.get('/accounts', accountsCtrl.searchAccounts);
router.get('/accounts/:id', accountsCtrl.getAccount);
router.put('/accounts/:id', accountsCtrl.updateAccount);
router.get('/users', usersCtrl.searchUsers);
router.get('/users/:id', usersCtrl.getUser);
router.get('/addons/new', addonsCtrl.getNewAddons);
router.post('/addons/new/:id', addonsCtrl.addNewAddon);

module.exports = router;

// Helpers

function getRoot(req, res, next) {
    var routes = router.stack;
    var routesList = [];
    for (var key in routes) {
        if (routes.hasOwnProperty(key)) {
            var val = routes[key];
            if(val.route) {
                val = val.route;
                var _o = {};
                _o[val.stack[0].method]  = [val.path];    
                routesList.push(_o);
            }       
        }

    }

    res.status(200);  
    res.send(routesList);
}