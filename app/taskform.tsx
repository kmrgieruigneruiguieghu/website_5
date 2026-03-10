"use client"

import { addTask } from "@/app/actions"

export default function AddTaskForm() {
  return (
    <form action={addTask} className="space-y-4">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Название задачи"
          required
          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl 
            text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Описание (необязательно)"
          className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl
            text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"/>
      </div>

      <button
        type="submit"
        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-xl transition-colors duration-300">
        Добавить задачу
      </button>
    </form>
  )
}