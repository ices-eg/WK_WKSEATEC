#create network
docker network create -d bridge --subnet 192.168.0.0/24 --gateway 192.168.0.1 gallerynet

#set current directory

set PWD=%cd%

#start compose

docker-compose pull && docker-compose up

start "" http://localhost:4200


