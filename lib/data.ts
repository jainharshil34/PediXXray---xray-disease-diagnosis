import type { Task } from "./types"

// In-memory storage (replace with database in production)
const tasks: Task[] = [
  {
    id: "1",
    title: "Setup project structure",
    description: "Create the basic folder structure and configuration files",
    completed: true,
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    completed: false,
    priority: "medium",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Design database schema",
    description: "Plan and create the database tables",
    completed: false,
    priority: "high",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function getTasks(): Promise<Task[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 100))
  return tasks.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getTaskById(id: string): Promise<Task | null> {
  await new Promise((resolve) => setTimeout(resolve, 50))
  return tasks.find((task) => task.id === id) || null
}

export async function createTask(data: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const newTask: Task = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  tasks.unshift(newTask)
  return newTask
}

export async function updateTask(id: string, data: Partial<Task>): Promise<Task | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const taskIndex = tasks.findIndex((task) => task.id === id)
  if (taskIndex === -1) return null

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  }

  return tasks[taskIndex]
}

export async function deleteTask(id: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const taskIndex = tasks.findIndex((task) => task.id === id)
  if (taskIndex === -1) return false

  tasks.splice(taskIndex, 1)
  return true
}
