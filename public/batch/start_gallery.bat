
docker network create -d transparent --subnet 192.168.0.0/24 --gateway 192.168.0.1 gallerynet



set PWD=%cd%



docker-compose pull && docker-compose up

start "" http://localhost:4200


