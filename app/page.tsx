import { getAllTasks } from "@/db/queries"
import AddTaskForm from "@/app/taskform"
import TaskList from "@/app/tasklist"

export default async function Home() {
  const tasks = await getAllTasks()

  return (
    <div className="min-h-screen relative text-white">
      <div className="fixed inset-0 z-0">
        <img src="/coffee.jpg" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Based Coffee</h1>
            <p>Задачи нашей кофейни</p>
          </div>

          {/* Форма добавления */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white">
            <h2 className="text-xl font-semibold text-white mb-4">Создать задачу</h2>
            <AddTaskForm />
          </div>

          {/* Список задач */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white">
            <h2 className="text-xl font-semibold text-white mb-4">
              Список задач
            </h2>
            <TaskList tasks={tasks} />
          </div>

        </div>
      </div>
    </div>
  )
}