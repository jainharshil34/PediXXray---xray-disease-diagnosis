export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  priority: "low" | "medium" | "high"
  createdAt: string
  updatedAt: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority: "low" | "medium" | "high"
}

export interface UpdateTaskData {
  title?: string
  description?: string
  completed?: boolean
  priority?: "low" | "medium" | "high"
}
