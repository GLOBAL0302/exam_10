create schema report collate utf8mb3_general_ci;

create table news
(
    id          int auto_increment
        primary key,
    title       varchar(255)                       not null,
    description varchar(255)                       not null,
    image       varchar(255)                       null,
    create_at   datetime default CURRENT_TIMESTAMP not null
);

create table comments
(
    id          int auto_increment
        primary key,
    news_id     int          not null,
    author      varchar(255) null,
    description varchar(255) not null,
    constraint comments_news_id_fk
        foreign key (news_id) references news (id)
);

