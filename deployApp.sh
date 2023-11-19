#!/bin/bash

FRONTEND_DIR="docs"
BACKEND_DIR="sudosumo_backend"
docker-compose kill
docker-compose rm -f
docker-compose --env-file .env up -d --build