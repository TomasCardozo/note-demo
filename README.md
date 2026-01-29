# Full Stack Implementation Exercise - Note Application

This repository contains a full-stack Notes application built as part of a technical exercise.

---

## Project Structure

```
backend/ # Spring Boot REST API
frontend/ # Frontend SPA (React+Vite)
docker-compose.yml # MySQL DB configuration
run.sh  # Script to start DB + backend + frontend
README.md
```

---

## Technologies

### Backend

- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- MySQL 8
- Maven

### Frontend

- JavaScript
- React
- Axios
- Bootstrap 5

### Data Base

- MySQL 8 (Docker)

### Tools

- Docker
- Docker Compose
- Git

---

## DB COnfiguration

The app uses a MySQL DB running in Docker. Details:

- Database name: `ensolvers\_note`
- User: `root`
- Password: `root`
- Port: `3306`

Hibernate configuration to automatically generate tables when the application starts (application.properties):

```
spring.jpa.hibernate.ddl-auto=update
```

## START THE APPLICATION

Start the MySQL DB using docker and run the Spring Boot backend, from the root of the repository:

```bash
./run.sh
```

Backend API will be at:

```
http:localhost:8080
```

Frontend UI will be at:

```
http:localhost:5173
```

## Features

### Notes

- CRUD notes
- Archive and unarchive notes
- Separate views for archive and unarchive notes

### Categories

- Add and remove categories from notes
- Display categories as tags
- Filter notes by one or more categories

## Autor

- Tomas Gabriel Cardozo
  System Engineering Student
  Junior Software Developer
