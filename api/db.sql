drop table if exists UserAcc;
create table if not exists UserAcc
(
    id          bigserial,
    phoneNumber  VARCHAR(15) not null ,
    email       text not null ,
    password    VARCHAR(255) not null ,
    created_at  timestamp with time zone NOT NULL DEFAULT now(),
    created_by  bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at  timestamp with time zone,
                              deleted_by  bigint,
                              active      boolean                           DEFAULT TRUE,
                              constraint pkey_user primary key (id)
    );

