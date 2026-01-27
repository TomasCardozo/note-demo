#!/usr/bin/env bash
set -e

docker compose up -d db
DB_CONTAINER=$(docker compose ps -q db)

until docker exec "$DB_CONTAINER" mysqladmin ping -uroot -proot --silent; do
  sleep 2
done


cd backend
./mvnw spring-boot:run