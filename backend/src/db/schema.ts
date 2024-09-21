import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  fistName: text("fistName").notNull(),
  lastName: text("lastName").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});
