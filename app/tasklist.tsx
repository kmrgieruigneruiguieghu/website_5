"use client"

import { removeTask, updateTaskStatus } from "@/app/actions"

interface Task {
  id: number
  title: string
  description: string | null
  status: string
}

interface TaskListProps {
  tasks: Task[]
}

export default function TaskList({ tasks }: TaskListProps) {
  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed": return "bg-green-500/20 text-green-300"
      case "pending": return "bg-blue-500/20 text-blue-300"
      default: return "bg-gray-500/20 text-gray-300"
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case "completed": return "✓ Завершено"
      case "pending": return "⏳ В работе"
      default: return "○"
    }
  }

  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-400 py-8">Нет задач</p>
      ) : (
        tasks.map((task) => (
          <div 
            key={task.id}
            className="bg-white/10 border border-white/20 rounded-xl p-4 hover:bg-white/20 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{task.title}</h3>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                  {getStatusText(task.status)}
                </span>
              </div>
            </div>
            
            {task.description && (
              <p className="text-gray-300 text-sm mb-3">{task.description}</p>
            )}

            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/10">
              <form action={updateTaskStatus} className="flex gap-2">
                <input type="hidden" name="taskId" value={task.id} />
                <select
                  name="status"
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-1 text-sm text-white"
                  onChange={(e) => e.target.form?.submit()}
                  defaultValue={task.status}
                >
                  <option value="pending">В работе</option>
                  <option value="completed">Завершено</option>
                </select>
              </form>

              <form action={removeTask}>
                <input type="hidden" name="taskId" value={task.id} />
                <button
                  type="submit"
                  className="text-red-300 hover:text-red-200 text-sm"
                >
                  Удалить
                </button>
              </form>
            </div>
          </div>
        ))
      )}
    </div>
  )
}