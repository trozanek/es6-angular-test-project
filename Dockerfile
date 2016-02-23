FROM node:argon
MAINTAINER Tomasz Rozanek <tomasz@rozanek.pl>

# Create app directory
RUN mkdir -p /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install global node dependencies
RUN npm install pm2 -g
RUN npm install jspm gulp karma karma-cli -g

# Install app dependencies
WORKDIR /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app/server
RUN npm install

WORKDIR /usr/src/app/

EXPOSE 80
EXPOSE 8080

CMD [ "bin/start.sh"]
