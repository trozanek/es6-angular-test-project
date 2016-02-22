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

    sudo docker run -d -v /usr/src/app -p 80:80 -p 8080:8080 --name socialhubnode --link socialhubdb:mongo socialhub

## Run from sources

### Requirements
- Mongo
- Node 5
- Grunt installed globally
- Webpack installed globally

### Installation

- Clone source
- cd to server directory
- run npm install
- add host, port and db name in config.json (By default it's set to an instance on my Digital Ocean droplet)
- cd to client directory
- run npm install
- run grunt webpack:prod
- cd ..
- (on linux) run bin\start.sh
- (non linux) run node server\server.js
- (non linux) run node client\static.js