FROM ubuntu:latest
MAINTAINER Tomasz Rozanek <tomasz@rozanek.pl>

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.0.list
RUN apt-get update && apt-get install -y mongodb-org
COPY dump/addonsTest/ /tmp/dump/addonsTest/
RUN mkdir -p /data/db && mongod --fork --logpath=/tmp/mongodb.log && sleep 20 && mongorestore -d  addonsTest /tmp/dump/addonsTest/ && mongod --shutdown
EXPOSE 27017
CMD ["mongod", "--smallfiles"]