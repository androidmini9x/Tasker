FROM postgres:alpine3.20

COPY database.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=root \
    POSTGRES_PASSWORD=toor

EXPOSE 5432