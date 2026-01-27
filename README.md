Full Stack Implementation Exercise - Note Application



* Project Structure



backend/ # Spring Boot REST API

frontend/ # Frontend SPA (JavaScript)

docker-compose.yml

run.sh

README.md



* Technologies



>> Backend

- Java 17

\- Spring Boot 3

\- Spring Web

\- Spring Data JPA

\- MySQL 8 

\- Maven



>> Data Base



\- MySQL 8 (Docker)



>> Tools



\- Docker

\- Docker Compose

\- Git



>> DB COnfiguration


- Database name: `ensolvers\_note`

\- User: `root`

\- Password: `root`

\- Port: `3306`



Hibernate configuration to automatically generate tables when the application starts (application.properties):

spring.jpa.hibernate.ddl-auto=update



* START THE APPLICATION



Start the MySQL DB using docker and run the Spring Boot backend, from the root of the repository:



```bash

./run.sh



