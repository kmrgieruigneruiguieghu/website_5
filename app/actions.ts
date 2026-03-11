"use server"

import { db } from "@/db/db"
import { users, tasks } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function addUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string

  if (!name || !email) return

  await db.insert(users).values({ name, email })
  revalidatePath("/")
}

export async function addTask(formData: FormData) {
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const userId = parseInt(formData.get("userId") as string)

  if (!title || !content || !userId) return

  await db.insert(tasks).values({ title, content, userId })
  revalidatePath("/")
}

export async function removeTask(formData: FormData) {
  const taskId = parseInt(formData.get("taskId") as string)

  if (!taskId) return

  await db.delete(tasks).where(eq(tasks.id, taskId))
  revalidatePath("/")
}

export async function removeUser(formData: FormData) {
  const userId = parseInt(formData.get("userId") as string)

  if (!userId) return

  await db.delete(tasks).where(eq(tasks.userId, userId))
  await db.delete(users).where(eq(users.id, userId))
  revalidatePath("/")
}