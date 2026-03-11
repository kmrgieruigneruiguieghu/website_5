import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core"


// export const tasks = sqliteTable("tasks", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   title: text("title").notNull(),
//   description: text("description"),
//   status: text("status").notNull().default("pending"), // pending, completed, cancelled
//   priority: text("priority").notNull().default("medium"),
//   createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(() => new Date()),
// })

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
})

export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
})