
docker network create -d bridge --subnet 192.168.0.0/24 --gateway 192.168.0.1 gallerynet



set DIR=%cd%

set COMPOSE_CONVERT_WINDOWS_PATHS=1

docker-compose pull && docker-compose up

start "" http://localhost:4200

pause
