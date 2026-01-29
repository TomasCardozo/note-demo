#!/usr/bin/env bash
set -e

docker compose up -d db
DB_CONTAINER=$(docker compose ps -q db)

until docker exec "$DB_CONTAINER" mysqladmin ping -uroot -proot --silent; do
  sleep 2
done


cd backend
./mvnw spring-boot:run &
BACKEND_PID=$!

until curl -s http://localhost:8080/api/categories >/dev/null; do
  sleep 2
done

create_category() {
  NAME=$1
  curl -s -o /dev/null -w "%{http_code}" \
    -X POST http://localhost:8080/api/categories \
    -H "Content-Type: application/json" \
    -d "{\"name\":\"$NAME\"}"
}

create_category "Work"
create_category "Personal"
create_category "Important"


cd ..
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!

cd ..

cleanup() {
  kill $FRONTEND_PID $BACKEND_PID 2>/dev/null || true
}

trap cleanup INT TERM

wait