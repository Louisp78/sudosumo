#!/bin/bash


cd sudosumo_backend
docker-compose kill
docker-compose rm -f
docker-compose --env-file ./../.env up -d --build

cd ../docs
docker-compose kill
docker-compose rm -f
yarn install
docker-compose --env-file ./../.env up -d --build