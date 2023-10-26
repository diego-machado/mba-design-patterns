CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

drop schema branas cascade;

create schema branas;

create table branas.contract (
	id_contract uuid not null default uuid_generate_v4() primary key,
	description text,
	amount numeric,
	periods integer,
	date timestamp
);

create table branas.payment (
	id_payment uuid not null default uuid_generate_v4() primary key,
	id_contract uuid references branas.contract (id_contract),
	amount numeric,
	date timestamp
);

insert into branas.contract values ('c68d586a-9d0e-4f25-be49-8a397f627592', 'Prestação de serviços escolares', 6000, 12, '2022-01-01T10:00:00');
insert into branas.payment values ('c4143c6c-0447-4050-95e4-ef26677cfdb3', 'c68d586a-9d0e-4f25-be49-8a397f627592', 6000, '2022-01-05T10:00:00');
