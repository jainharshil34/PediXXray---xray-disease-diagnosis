"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Trash2 } from "lucide-react"
import { updateTask, deleteTask } from "@/lib/actions"
import { useToast } from "@/hooks/use-toast"
import type { Task } from "@/lib/types"

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleToggleComplete = async () => {
    setIsLoading(true)
    try {
      const result = await updateTask(task.id, { completed: !task.completed })
      if (result.success) {
        toast({
          title: "Success",
          description: `Task ${task.completed ? "marked as incomplete" : "completed"}!`,
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const result = await deleteTask(task.id)
      if (result.success) {
        toast({
          title: "Success",
          description: "Task deleted successfully!",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "default"
    }
  }

  return (
    <Card className={task.completed ? "opacity-60" : ""}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={handleToggleComplete}
            disabled={isLoading}
            className="mt-1"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`font-medium ${task.completed ? "line-through" : ""}`}>{task.title}</h3>
              <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
            </div>

            {task.description && (
              <p className={`text-sm text-muted-foreground ${task.completed ? "line-through" : ""}`}>
                {task.description}
              </p>
            )}

            <p className="text-xs text-muted-foreground mt-2">
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={handleDelete} disabled={isLoading}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
