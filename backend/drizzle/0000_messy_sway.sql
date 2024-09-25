CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"password" text,
	"firstName" text,
	"lastName" text,
	"createdAt" timestamp DEFAULT now(),
	"googleId" text,
	"role" text
);
