"use server"

import { db } from "@/db/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

// Добавление задачи
export async function addTask(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string

  if (!title) return

  await db.insert(tasks).values({
    title,
    description: description || null,
    status: "pending",
  })

  revalidatePath("/")
}

// Удаление задачи
export async function removeTask(formData: FormData) {
  const taskId = parseInt(formData.get("taskId") as string)
  if (!taskId) return

  await db.delete(tasks).where(eq(tasks.id, taskId))
  revalidatePath("/")
}

// Обновление статуса
export async function updateTaskStatus(formData: FormData) {
  const taskId = parseInt(formData.get("taskId") as string)
  const status = formData.get("status") as string

  if (!taskId || !status) return

  await db.update(tasks)
    .set({ status })
    .where(eq(tasks.id, taskId))

  revalidatePath("/")
}