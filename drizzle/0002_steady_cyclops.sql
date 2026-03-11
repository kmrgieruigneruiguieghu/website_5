CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
ALTER TABLE `tasks` ADD `content` text NOT NULL;--> statement-breakpoint
ALTER TABLE `tasks` ADD `user_id` integer NOT NULL REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `description`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `priority`;--> statement-breakpoint
ALTER TABLE `tasks` DROP COLUMN `created_at`;