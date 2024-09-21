CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"fistName" text NOT NULL,
	"lastName" text NOT NULL,
	"createdAt" timestamp DEFAULT now()
);
