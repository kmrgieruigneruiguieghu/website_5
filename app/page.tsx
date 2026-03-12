import { getUsers, getTasksWithAuthor } from "@/db/queries"
import { addUser, addTask, removeTask, removeUser } from "./actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function Page() {
  const users = await getUsers()
  const tasksWithAuthors = await getTasksWithAuthor()
  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <img src="/coffee.jpg" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">  
          <h1 className="text-4xl text-right font-bold text-[#deb100] mb-10">Based Coffee</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-[#0d0f1f]/80 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Управление сотрудниками</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={addUser} className="space-y-6 mb-8">
                  <div>
                    <label className="text-white">ФИО</label>
                    <Input
                      name="name"
                      placeholder="Человеков Человек Человекович"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-white">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="abcdefg@gmail.com"
                      className="bg-white"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-[#b05f02] hover:bg-[#d67200] text-white">
                    Добавить
                  </Button>
                </form>
                <h3 className="text-lg text-white mb-4">Список сотрудников:</h3>
                <div className="space-y-3">
                  {users.map((user) => (
                    <div 
                      key={user.id} 
                      className="bg-[#0d0f1f]/80 rounded-lg p-4 flex justify-between items-center border border-[#4f4f4f]">
                      <div>
                        <div className="text-white mb-3">{user.name}</div>
                        <div className="text-white">{user.email}</div>
                      </div>
                      <form action={removeUser}>
                        <input type="hidden" name="userId" value={user.id}/>
                        <Button type="submit" variant="destructive" className="bg-[#ab0000] hover:bg-[#690000] text-white">
                          Удалить
                        </Button>
                      </form>
                    </div>
                  ))}
                  {users.length === 0 && (
                      <p className="text-[#878787] text-center py-4">Нет сотрудников</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-[#0d0f1f]/80 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Управление задачами</CardTitle>
              </CardHeader>
              <CardContent>
                <form action={addTask} className="space-y-6 mb-8">
                  <div>
                    <label className="text-white">Название задачи</label>
                    <Input
                      name="title"
                      placeholder="Готовит латте"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-white">Описание</label>
                    <Input
                      name="content"
                      placeholder="Подробности"
                      className="bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-white">Отвечающий сотрудник</label>
                    <select
                      name="userId"
                      className="w-full bg-white rounded-lg px-3 py-2 focus:border-2 focus:border-[#d67200]">
                      {users.map((user) => (
                        <option key={user.id} value={user.id} className="bg-white">
                          {user.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" className="w-full bg-[#b05f02] hover:bg-[#d67200] text-white">
                    Добавить
                  </Button>
                </form>
                <h3 className="text-lg text-white mb-4">Список сотрудников:</h3>
                <div className="space-y-3">
                  {tasksWithAuthors.map((task) => (
                    <div 
                      key={task.id} 
                      className="bg-[#0d0f1f]/80 rounded-lg p-4 flex justify-between items-center border border-[#4f4f4f]">
                      <div>
                        <div className="text-lg font-bold text-[#deb100] mb-2">Задача: {task.title}</div>
                        <div className="text-white mb-3">Описание: {task.content}</div>
                        <div className="text-lg font-bold text-[#deb100] mb-2">Ответственный:</div>
                        <div className="text-white mb-2">{task.author}</div>
                        <div className="text-white mb-2">Почта: {task.authoremail}</div>
                      </div>
                      <form action={removeTask}>
                        <input type="hidden" name="taskId" value={task.id}/>
                        <Button type="submit" variant="destructive" className="bg-[#ab0000] hover:bg-[#690000] text-white">
                          Удалить
                        </Button>
                      </form>
                    </div>
                  ))}
                  {tasksWithAuthors.length === 0 && (
                      <p className="text-[#878787] text-center py-4">Нет задач</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}