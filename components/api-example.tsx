"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Task } from "@/lib/types"

export function ApiExample() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)

  const fetchTasks = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/tasks")
      const data = await response.json()
      setTasks(data.tasks || [])
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const createTaskViaAPI = async () => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `API Task ${Date.now()}`,
          description: "Created via REST API",
          priority: "medium",
        }),
      })

      if (response.ok) {
        fetchTasks() // Refresh the list
      }
    } catch (error) {
      console.error("Error creating task:", error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Integration Example</CardTitle>
        <CardDescription>Demonstrating REST API calls from the frontend</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={fetchTasks} disabled={loading}>
            {loading ? "Loading..." : "Fetch Tasks"}
          </Button>
          <Button onClick={createTaskViaAPI} variant="outline">
            Create Task via API
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Tasks from API:</h4>
          {tasks.length === 0 ? (
            <p className="text-muted-foreground text-sm">No tasks loaded</p>
          ) : (
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center gap-2 p-2 border rounded">
                  <span className="flex-1 text-sm">{task.title}</span>
                  <Badge variant="outline" className="text-xs">
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
