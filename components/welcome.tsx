import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/components/translations-context"

export const Welcome = () => {
  const { t } = useTranslations()
  
  return (
    <div className="text-center mb-8 rounded-lg p-4">
      <div className="flex justify-center items-center mx-auto gap-2 h-full w-full mb-2">
        <Badge className="text-xl font-medium motion-preset-slide-left-md">
          {t('hero.badge')}
        </Badge>
        <Link href="https://github.com/cameronking4/shadcn-openai-realtime-webrtc">
          <Button className="shadow-md rounded-full motion-preset-slide-up-right" variant="outline">
            <GithubIcon />
          </Button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-4 motion-preset-slide-up-lg">
        {t('hero.title')}
      </h1>
      <p className="max-w-2xl mx-auto motion-preset-slide-down">
        {t('hero.subtitle')}
      </p>
    </div>
  )
} 

export default Welcome;