CREATE TABLE `contact_leads` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`entity_type` text NOT NULL,
	`entity_slug` text NOT NULL,
	`entity_name` text NOT NULL,
	`category` text,
	`city_name` text,
	`visitor_name` text NOT NULL,
	`visitor_whatsapp` text NOT NULL,
	`visitor_city` text,
	`interest` text,
	`source_path` text,
	`consent` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
