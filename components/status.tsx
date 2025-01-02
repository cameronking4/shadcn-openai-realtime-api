"use client"

import { useEffect } from 'react'
import { toast } from 'sonner'
import { useTranslations } from "@/components/translations-context"

interface StatusDisplayProps {
  status: string
}

export function StatusDisplay({ status }: StatusDisplayProps) {
  const { t } = useTranslations();
  useEffect(() => {
    if (status.startsWith("Error")) {
      toast.error(t('status.error'), {
        description: status,
        duration: 3000,
      })
    } 
    else if (status.startsWith("Session established")) {
        toast.success(t('status.success'), {
            description: status,
            duration: 5000,
        })
    }
    else {
      toast.info(t('status.info'), {
        description: status,
        duration: 3000,
      })
    }
  }, [status, t])
    return null
} 