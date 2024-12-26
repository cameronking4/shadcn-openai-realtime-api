"use client"

import { useEffect } from 'react'
import { toast } from 'sonner'

interface StatusDisplayProps {
  status: string
}

export function StatusDisplay({ status }: StatusDisplayProps) {

  useEffect(() => {
    if (status.startsWith("Error")) {
      toast.error("Whoops!", {
        description: status,
        duration: 3000,
      })
    } 
    else if (status.startsWith("Session established")) {
        toast.success("We're live, baby!", {
            description: status,
            duration: 5000,
        })
    }
    else {
      toast.info("Toggling Voice Assistant...", {
        description: status,
        duration: 3000,
      })
    }
  }, [status])
    return null
} 