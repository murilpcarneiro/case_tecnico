CREATE TABLE `filmes` (
	`id` text PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`diretor` text NOT NULL,
	`ano_lancamento` integer NOT NULL,
	`genero` text,
	`nota` real,
	`data_assistido` text
);
