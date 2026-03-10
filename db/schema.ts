import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"), // pending, completed, cancelled
  priority: text("priority").notNull().default("medium"), // low, medium, high
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
})