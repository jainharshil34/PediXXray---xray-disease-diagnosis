"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Thermometer, Target, Layers } from "lucide-react"

interface HeatmapData {
  x: number
  y: number
  intensity: number
  confidence: number
  label: string
}

interface XrayHeatmapProps {
  imageUrl: string
  heatmapData: HeatmapData[]
  predictions: {
    "No finding": number
    Pneumonia: number
    "Other disease": number
  }
}

export function XrayHeatmap({ imageUrl, heatmapData, predictions }: XrayHeatmapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [opacity, setOpacity] = useState([70])
  const [showHeatmap, setShowHeatmap] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState<HeatmapData | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Generate mock heatmap data based on predictions
  const generateHeatmapData = (): HeatmapData[] => {
    const data: HeatmapData[] = []

    // If pneumonia is detected, add hotspots in lung areas
    if (predictions.Pneumonia > 0.3) {
      data.push(
        { x: 0.3, y: 0.4, intensity: predictions.Pneumonia, confidence: predictions.Pneumonia, label: "Pneumonia" },
        {
          x: 0.7,
          y: 0.45,
          intensity: predictions.Pneumonia * 0.8,
          confidence: predictions.Pneumonia * 0.8,
          label: "Pneumonia",
        },
      )
    }

    // If other disease is detected, add hotspots
    if (predictions["Other disease"] > 0.3) {
      data.push(
        {
          x: 0.5,
          y: 0.3,
          intensity: predictions["Other disease"],
          confidence: predictions["Other disease"],
          label: "Other disease",
        },
        {
          x: 0.4,
          y: 0.6,
          intensity: predictions["Other disease"] * 0.7,
          confidence: predictions["Other disease"] * 0.7,
          label: "Other disease",
        },
      )
    }

    return data
  }

  const actualHeatmapData = heatmapData.length > 0 ? heatmapData : generateHeatmapData()

  useEffect(() => {
    if (!imageLoaded || !canvasRef.current || !imageRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const image = imageRef.current

    if (!ctx) return

    // Set canvas size to match image
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!showHeatmap) return

    // Create gradient for heatmap
    actualHeatmapData.forEach((point) => {
      const x = point.x * canvas.width
      const y = point.y * canvas.height
      const radius = 80 * point.intensity

      // Create radial gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)

      // Color based on intensity and type
      const alpha = (opacity[0] / 100) * point.intensity
      if (point.label === "Pneumonia") {
        gradient.addColorStop(0, `rgba(255, 0, 0, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(255, 100, 0, ${alpha * 0.7})`)
        gradient.addColorStop(1, `rgba(255, 200, 0, 0)`)
      } else {
        gradient.addColorStop(0, `rgba(255, 165, 0, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(255, 200, 100, ${alpha * 0.7})`)
        gradient.addColorStop(1, `rgba(255, 255, 0, 0)`)
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    })
  }, [imageLoaded, showHeatmap, opacity, actualHeatmapData])

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    const x = ((event.clientX - rect.left) * scaleX) / canvas.width
    const y = ((event.clientY - rect.top) * scaleY) / canvas.height

    // Find closest heatmap point
    let closest: HeatmapData | null = null
    let minDistance = Number.POSITIVE_INFINITY

    actualHeatmapData.forEach((point) => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
      if (distance < 0.1 && distance < minDistance) {
        minDistance = distance
        closest = point
      }
    })

    setSelectedRegion(closest)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            AI Heat Map Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap items-center gap-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Switch checked={showHeatmap} onCheckedChange={setShowHeatmap} />
              <Label className="flex items-center gap-2">
                {showHeatmap ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                Show Heat Map
              </Label>
            </div>

            <div className="flex items-center gap-3 min-w-[200px]">
              <Label className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Opacity
              </Label>
              <Slider value={opacity} onValueChange={setOpacity} max={100} min={10} step={10} className="flex-1" />
              <span className="text-sm font-mono w-12">{opacity[0]}%</span>
            </div>
          </div>

          {/* Image with Heatmap Overlay */}
          <div className="relative inline-block">
            <img
              ref={imageRef}
              src={imageUrl || "/placeholder.svg"}
              alt="Chest X-ray"
              className="max-w-full h-auto rounded-lg shadow-lg"
              onLoad={() => setImageLoaded(true)}
              style={{ maxHeight: "600px" }}
            />
            <canvas
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full rounded-lg cursor-crosshair"
              onClick={handleCanvasClick}
              style={{
                mixBlendMode: "multiply",
                opacity: showHeatmap ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            />

            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
              <div className="text-sm font-medium">Heat Map Legend</div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-xs">Pneumonia</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded"></div>
                <span className="text-xs">Other Disease</span>
              </div>
              <div className="text-xs text-gray-600 mt-2">Click on highlighted areas for details</div>
            </div>
          </div>

          {/* Region Details */}
          {selectedRegion && (
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">Selected Region Details</span>
                </div>
                <div className="grid gap-2 text-sm">
                  <div className="flex justify-between">
                    <span>Condition:</span>
                    <Badge variant={selectedRegion.label === "Pneumonia" ? "destructive" : "secondary"}>
                      {selectedRegion.label}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence:</span>
                    <span className="font-mono">{(selectedRegion.confidence * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Intensity:</span>
                    <span className="font-mono">{(selectedRegion.intensity * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Position:</span>
                    <span className="font-mono">
                      ({(selectedRegion.x * 100).toFixed(0)}%, {(selectedRegion.y * 100).toFixed(0)}%)
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Heat Map Statistics */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {actualHeatmapData.filter((d) => d.label === "Pneumonia").length}
                </div>
                <div className="text-sm text-gray-600">Pneumonia Regions</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {actualHeatmapData.filter((d) => d.label === "Other disease").length}
                </div>
                <div className="text-sm text-gray-600">Other Disease Regions</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {actualHeatmapData.length > 0
                    ? Math.max(...actualHeatmapData.map((d) => d.confidence * 100)).toFixed(1)
                    : 0}
                  %
                </div>
                <div className="text-sm text-gray-600">Max Confidence</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
