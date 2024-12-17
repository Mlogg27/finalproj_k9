drop table if exists driver_acc;
create table if not exists driver_acc
(
    id          bigserial,
    phoneNumber  VARCHAR(15) not null ,
    email       text not null ,
    password    VARCHAR(255) not null ,
    verify TEXT CHECK (verify IN ('step2', 'step3', 'verified', 'unverified')) default 'unverified',
    created_at  timestamp with time zone NOT NULL DEFAULT now(),
    created_by  bigint,
    modified_at timestamp with time zone,
    modified_by bigint,
    deleted_at  timestamp with time zone,
                              deleted_by  bigint,
                              active      boolean                           DEFAULT TRUE,
                              constraint pkey_user primary key (id)
    );
create index email_index on driver_acc (email);

drop table if exists blacklisttokens;
create table if not exists blacklisttokens
(
    id        bigserial,
    token     text not null,
    createdAt timestamp,
    expiresAt timestamp,
    constraint pkey_tokenBlackList primary key (id)
    );
create index token_index on blacklistTokens (token);

VACUUM FULL