import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: varchar("id").notNull().primaryKey(),
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
  id: varchar("id").notNull().primaryKey(),
  title: text("title"),
  description: text("description"),
  price: integer("price"),
  imageUrl: text("imageUrl"),
  createdAt: timestamp("createdAt").defaultNow(),
  creatorId: varchar("creatorId").references(() => users.id),
});

export const purchases = pgTable("purchases", {
  purchaseId: varchar("purchaseId").notNull().primaryKey(),
  courseId: varchar("courseId").references(() => courses.id),
  userId: varchar("userId").references(() => users.id),
  purchasedAt: timestamp("createdAt").defaultNow(),
});
