/**
 * Database Schema Definitions:
 * - **Accounts Table (`accounts`)**:
 *   - `id`: Primary key, text
 *   - `plaidId`: Text, optional
 *   - `name`: Text, not null
 *   - `userId`: Text, not null
 *   - Relationships: One-to-many with `transactions`
 *   - Insert Schema: `insertAccountSchema`
 *
 * - **Categories Table (`categories`)**:
 *   - `id`: Primary key, text
 *   - `plaidId`: Text, optional
 *   - `name`: Text, not null
 *   - `userId`: Text, not null
 *   - Relationships: One-to-many with `transactions`
 *   - Insert Schema: `insertCategorySchema`
 *
 * - **Transactions Table (`transactions`)**:
 *   - `id`: Primary key, text
 *   - `amount`: Integer, not null
 *   - `payee`: Text, not null
 *   - `notes`: Text, optional
 *   - `date`: Timestamp (date mode), not null
 *   - `accountId`: Text, references `accounts.id`, not null
 *   - `categoryId`: Text, references `categories.id`, optional
 *   - Relationships: Many-to-one with `accounts`, many-to-one with `categories`
 *   - Insert Schema: `insertTransactionSchema` (coerces date to `Date` object)
 */

import { z } from "zod";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  plaidId: text("plaidId"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

//account relations
export const accountsRelations = relations(accounts, ({ many }) => ({
  transactions: many(transactions),
}));

//schema for inserting a user - can be used to validate API request
export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable("categories", {
  id: text("id").primaryKey(),
  plaidId: text("plaidId"),
  name: text("name").notNull(),
  userId: text("user_id").notNull(),
});

//categories relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable("transactions", {
  id: text("id").primaryKey(),
  amount: integer("amount").notNull(),
  payee: text("payee").notNull(),
  notes: text("notes"),
  date: timestamp("date", { mode: "date" }).notNull(),

  accountId: text("account_id")
    .references(() => accounts.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: text("category_id").references(() => categories.id, {
    onDelete: "set null",
  }),
});

// one to many relation
export const transactionsRelations = relations(transactions, ({ one }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id],
  }),
  categories: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));

export const insertTransactionSchema = createInsertSchema(transactions, {
  date: z.coerce.date(),
});
