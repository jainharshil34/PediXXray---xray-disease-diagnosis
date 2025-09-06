import { type NextRequest, NextResponse } from "next/server"
import { getTasks, createTask } from "@/lib/data"

export async function GET() {
  try {
    const tasks = await getTasks()
    return NextResponse.json({ tasks })
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, priority } = body

    if (!title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const task = await createTask({
      title: title.trim(),
      description: description?.trim() || "",
      priority: priority || "medium",
      completed: false,
    })

    return NextResponse.json({ task }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}
