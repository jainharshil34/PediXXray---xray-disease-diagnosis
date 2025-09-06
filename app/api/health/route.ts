import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    services: {
      api: "running",
      model: "loaded", // You can check actual model status here
    },
  })
}
