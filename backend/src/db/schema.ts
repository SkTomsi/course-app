import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").notNull().primaryKey(),
  email: text("email"),
  password: text("password"),
  firstName: text("firstName"),
  lastName: text("lastName"),
  createdAt: timestamp("createdAt").defaultNow(),
  googleId: text("googleId"),
  role: text("role").default("user"),
});

export type userSchema = typeof users.$inferInsert;

export const courses = pgTable("courses", {
  id: serial("id").primaryKey().notNull(),
  title: text("title"),
  description: text("description"),
  price: integer("price"),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
  creatorId: serial("userId").references(() => users.id),
});
