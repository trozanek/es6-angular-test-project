sudo docker run -d -v /var/mongo/db:/data/db -p 27017:27017 --name socialhubdb  herunohazumi/socialhubdb

sudo docker run -d -v /usr/src/app -p 80:80 -p 8080:8080 --name socialhubnode --link socialhubdb:mongo socialhub




DEV

sudo docker run -d -v $PWD:/usr/src/app -p 80:80 -p 8080:8080 --name socialhubnode --link socialhubdb:mongo socialhub