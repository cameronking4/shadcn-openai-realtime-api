import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BroadcastButtonProps {
  isSessionActive: boolean
  onClick: () => void
}

export function BroadcastButton({ isSessionActive, onClick }: BroadcastButtonProps) {
  return (
    <Button
      variant={isSessionActive ? "destructive" : "default"}
      className="w-full py-6 text-lg font-medium flex items-center justify-center gap-2 motion-preset-shake"
      onClick={onClick}
    >
      {isSessionActive && (
        <Badge variant="secondary" className="animate-pulse bg-red-100 text-red-700">
          Live
        </Badge>
      )}
      {isSessionActive ? "End Broadcasting Session" : "Start Broadcasting"}
    </Button>
  )
} 