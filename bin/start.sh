#!/bin/bash
echo "Welcome SocialHub!"
cd /usr/src/app/client
pm2 start static.js 
cd /usr/src/app/server
pm2 start server.js --no-daemon

$SHELL