#!/bin/bash

FRONTEND_DIR="docs"
BACKEND_DIR="sudosumo_backend"

cd "$BACKEND_DIR" || (echo "Unable to locate backEnd folder" && exit 1)
docker-compose kill
docker-compose rm -f
docker-compose --env-file ./../.env up -d --build

cd ../"$FRONTEND_DIR" || (echo "Unable to locate frontEnd folder" && exit 1)
docker-compose kill
docker-compose rm -f
yarn install
docker-compose --env-file ./../.env up -d --build