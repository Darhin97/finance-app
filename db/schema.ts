import { pgTable, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaidId"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

//schema for inserting a user - can be used to validate API request
export const insertAccountSchema = createInsertSchema(accounts);
