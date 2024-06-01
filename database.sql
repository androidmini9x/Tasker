create database app;
create table tasks (
    id serial primary key,
    title varchar(255) not null,
    description text,
    created_at date not null,
    updated_at date not null
);