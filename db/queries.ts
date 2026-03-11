import { db } from "./db"
import { users, tasks } from "./schema"
import { eq } from "drizzle-orm"

export async function createUser(name: string, email: string) {
  return db.insert(users).values({ name, email }).returning()
}

export async function createTask(title: string, content: string, userId: number) {
  return db.insert(tasks).values({ title, content, userId }).returning()
}

export async function getTasksWithAuthor() {
  return db
  .select({
    id: tasks.id,
    title: tasks.title,
    author: users.name,
    content: tasks.content,
    authoremail: users.email,
  })
  .from(tasks)
  .leftJoin(users, eq(tasks.userId, users.id))
}

export async function getUsers() {
  return db.select().from(users)
}

export async function deleteTask(taskId: number) {
  return db.delete(tasks).where(eq(tasks.id, taskId))
}

export async function deleteUser(userId: number) {
  return db.delete(tasks).where(eq(tasks.userId, userId)), db.delete(users).where(eq(users.id, userId))
}