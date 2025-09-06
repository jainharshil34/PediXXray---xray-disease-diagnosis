"use server"

import { revalidatePath } from "next/cache"
import { createTask as createTaskData, updateTask as updateTaskData, deleteTask as deleteTaskData } from "./data"
import type { CreateTaskData, UpdateTaskData } from "./types"

export async function createTask(formData: FormData) {
  try {
    const title = formData.get("title") as string
    const description = formData.get("description") as string
    const priority = formData.get("priority") as "low" | "medium" | "high"

    if (!title?.trim()) {
      return { success: false, error: "Title is required" }
    }

    const taskData: CreateTaskData & { completed: boolean } = {
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority || "medium",
      completed: false,
    }

    await createTaskData(taskData)

    // Revalidate the page to show the new task
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error creating task:", error)
    return { success: false, error: "Failed to create task" }
  }
}

export async function updateTask(id: string, data: UpdateTaskData) {
  try {
    const updatedTask = await updateTaskData(id, data)

    if (!updatedTask) {
      return { success: false, error: "Task not found" }
    }

    revalidatePath("/")
    return { success: true, task: updatedTask }
  } catch (error) {
    console.error("Error updating task:", error)
    return { success: false, error: "Failed to update task" }
  }
}

export async function deleteTask(id: string) {
  try {
    const deleted = await deleteTaskData(id)

    if (!deleted) {
      return { success: false, error: "Task not found" }
    }

    revalidatePath("/")
    return { success: true }
  } catch (error) {
    console.error("Error deleting task:", error)
    return { success: false, error: "Failed to delete task" }
  }
}
