import { db } from "./db"
import { tasks } from "./schema"
import { desc, eq } from "drizzle-orm"  // ← Нужно добавить eq

// Получение всех задач
export async function getAllTasks() {
  return db.select().from(tasks).orderBy(desc(tasks.createdAt))
}

// Добавление задачи
export async function createTask(title: string, description: string | null) {
  return db.insert(tasks).values({
    title,
    description,
    status: "pending",
  }).returning()
}

// Удаление задачи
export async function deleteTask(taskId: number) {  // ← Убрал лишние параметры
  return db.delete(tasks).where(eq(tasks.id, taskId)).returning()  // ← Исправил where
}

// Обновление статуса
export async function updateTaskStatus(taskId: number, status: string) {
  return db.update(tasks)
    .set({ status })
    .where(eq(tasks.id, taskId))  // ← Добавил where
    .returning()
}