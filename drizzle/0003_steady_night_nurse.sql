CREATE TABLE `inclusion_requests` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entity_type` text NOT NULL,
	`name` text NOT NULL,
	`category` text,
	`city_name` text,
	`contact_name` text NOT NULL,
	`contact_email` text,
	`contact_phone` text NOT NULL,
	`message` text,
	`status` text DEFAULT 'new' NOT NULL,
	`source` text DEFAULT 'portal' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
