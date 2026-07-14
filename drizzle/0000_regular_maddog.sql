CREATE TABLE `audit_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` integer NOT NULL,
	`action` text NOT NULL,
	`actor_email` text,
	`detail` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`advertiser_name` text NOT NULL,
	`name` text NOT NULL,
	`position_code` text NOT NULL,
	`city_slug` text,
	`starts_at` text NOT NULL,
	`ends_at` text NOT NULL,
	`destination_url` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`ibge_code` text NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`active` integer DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cities_ibge_code_unique` ON `cities` (`ibge_code`);--> statement-breakpoint
CREATE UNIQUE INDEX `cities_slug_unique` ON `cities` (`slug`);--> statement-breakpoint
CREATE TABLE `organizations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_name` text NOT NULL,
	`slug` text NOT NULL,
	`category` text NOT NULL,
	`city_id` integer,
	`cnes_code` text,
	`public_phone` text,
	`address` text,
	`source_url` text,
	`status` text DEFAULT 'imported' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizations_slug_unique` ON `organizations` (`slug`);--> statement-breakpoint
CREATE TABLE `professionals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`public_name` text NOT NULL,
	`slug` text NOT NULL,
	`profession` text NOT NULL,
	`specialty` text,
	`city_id` integer,
	`council_acronym` text,
	`council_state` text,
	`registration_number` text,
	`organization_name` text,
	`public_phone` text,
	`whatsapp` text,
	`source_url` text,
	`source_date` text,
	`status` text DEFAULT 'imported' NOT NULL,
	`reviewed_by` text,
	`reviewed_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `professionals_slug_unique` ON `professionals` (`slug`);--> statement-breakpoint
CREATE TABLE `sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` integer NOT NULL,
	`source_type` text NOT NULL,
	`url` text NOT NULL,
	`retrieved_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`supported_fields` text
);
