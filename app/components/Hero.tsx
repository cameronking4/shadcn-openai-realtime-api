import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <div className="text-center mb-8 rounded-lg p-4">
      <div className="flex justify-center items-center mx-auto gap-2 h-full w-full mb-2">
        <Badge className="text-xl font-medium motion-preset-slide-left-md">
        Next.js + shadcn/ui
        </Badge>
        <Link href="https://github.com/cameronking4/shadcn-openai-realtime-webrtc">
          <Button className="shadow-md rounded-full motion-preset-slide-up-right" variant="outline">
            <GithubIcon />
          </Button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-4 motion-preset-slide-up-lg">
       OpenAI Realtime API (WebRTC)
      </h1>
      <p className="max-w-2xl mx-auto motion-preset-slide-down">
       Demo by clicking the button below and try available tools
      </p>
    </div>
  )
} 