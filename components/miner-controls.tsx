"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Settings, Play, Pause, RotateCcw, Zap } from "lucide-react"

export function MinerControls() {
  const [autoMode, setAutoMode] = useState(true)
  const [powerLimit, setPowerLimit] = useState([75])
  const [isRunning, setIsRunning] = useState(true)

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-primary" />
          Mining Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Auto Mining</p>
            <p className="text-xs text-muted-foreground">Automatically optimize mining</p>
          </div>
          <Switch checked={autoMode} onCheckedChange={setAutoMode} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Power Limit</span>
            <Badge variant="outline">{powerLimit[0]}%</Badge>
          </div>
          <Slider value={powerLimit} onValueChange={setPowerLimit} max={100} min={25} step={5} className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant={isRunning ? "destructive" : "default"}
            onClick={() => setIsRunning(!isRunning)}
            className="w-full"
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Stop All
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start All
              </>
            )}
          </Button>

          <Button variant="outline" className="w-full bg-transparent">
            <RotateCcw className="h-4 w-4 mr-2" />
            Restart
          </Button>
        </div>

        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Quick Actions</span>
          </div>
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Optimize for Efficiency
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Maximize Hash Rate
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              Silent Mode
            </Button>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">System Status</p>
          <Badge className="bg-green-500 text-white">All Systems Operational</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
