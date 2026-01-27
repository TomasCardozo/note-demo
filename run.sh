#!/usr/bin/env bash
set -e

docker compose up -d db

cd backend
./mvnw spring-boot:run