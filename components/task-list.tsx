import { getTasks } from "@/lib/data"
import { TaskItem } from "@/components/task-item"

export async function TaskList() {
  const tasks = await getTasks()

  if (tasks.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No tasks yet. Create your first task!</div>
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}
