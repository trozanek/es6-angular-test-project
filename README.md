# Setup

There are 2 ways of setting up the app
- Docker containers
- From sources

## Docker containers

The whole application is dockerized. That's the easiest way to set it up.

### Requirements
- Docker

### Installing containers

First container contains mongodb. It's mounted to the local system. Running local container will map mongo port to local 27017.
In order to map it to another port replace first value passed to -p param eg. 29017:27017.
Running container installs, populates db with dump data and runs mongo.

    docker run -d -v /data/db -p 27017:27017 --name socialhubdb  herunohazumi/socialhubdb

Second container contains node and frontend app. You can also replace mapped ports. This container links to mongo container.
Running this container will deploy applications and run api server script and static server hosting a frontend app using PM2.

    docker run -d -v /usr/src/app -p 80:80 -p 8080:8080 --name socialhubnode --link socialhubdb:mongo herunohazumi/socialhub

## Run from sources

### Requirements
- Mongo
- Node 5
- Gulp installed globally
- JSPM installed globally

### Installation
- RUN npm install jspm gulp karma karma-cli -g
- Clone source
- cd to server directory
- RUN npm install
- add host, port and db name in config.json (By default it's set to an instance on my Digital Ocean droplet)
- cd to client directory
- RUN npm install
- RUN jspm install
- RUN gulp build
- cd ..
- (on linux) run bin\start.sh
- (non linux) run node server\server.js
- (non linux) run node client\static.js

# Instructions

## Server part

By default it listens at 8080 port

There are following endpoints available:

    GET /                   Lists all endpoints.
    GET /accounts           Lists all accounts from accounts collection.
    GET /accounts/:id       Returns account with provided id (@id: mongo _id)
    PUT /accounts/:id       Updates account with provided id. Accepts body as a paylod (@id: monog _id). 
    GET /users              Lists all usesrs from users collection
    GET /users/:id          Returns user with provided id. (@id: mongo _id)
    GET '/addons/new        Returns all addons marked as new
    POST '/addons/new/:id   Creates new record in addons collection with id specified in request and new property set to true (@id: addon id - matching value from features in account)

Sending emais is handled server sid within accounts controller (PUT) using mailgun lib.

## Frontend part

App is angular application bundled with JSPM and transpiled with Babel. It uses gulp as a task runner.
It's structured in component manner and uses ES6 classes for controllers. Sources are located in /client/client directory (sorry for that naming but yo messed something up :()
Built sources go to dist directory.

Handling new addons.

There's and api endpoint /addons/new/:id. You can use it to mark addon as new using its id eg. for approvalProcess feature it will be POST request /addons/new/approvalProcess.
Application fetches the /addons/new endpoint getting all features marked as new in db. For each feature it creates localstorage record with displays count. 
Feature remain marked as new until it's displays counter reaches 20. After that it stops being marked as new.

Enabling premium feature triggers PUT request to /accounts/:id api endpoint passing ordered premium features as 'order' property in payload. Api handles it by sending an email using mailgun lib.