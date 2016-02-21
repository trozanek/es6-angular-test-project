FROM node:argon
MAINTAINER Tomasz Rozanek <tomasz@rozanek.pl>

# Create app directory
RUN mkdir -p /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
WORKDIR /usr/src/app/client
RUN npm install

WORKDIR /usr/src/app/server
RUN npm install
RUN npm install pm2 -g  

WORKDIR /usr/src/app/

EXPOSE 80
EXPOSE 8080

CMD [ "bin/start.sh"]
