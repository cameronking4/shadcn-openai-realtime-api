"use client"

import { createContext, useContext, useState, ReactNode } from 'react'
import { en } from './en'
import { es } from './es'
import { fr } from './fr'
import { zh } from './zh'

type Translations = {
  [key: string]: any
}

const translations: { [key: string]: Translations } = {
  en,
  es,
  fr,
  zh
}

type TranslationsContextType = {
  t: (key: string) => string
  locale: string
  setLocale: (locale: string) => void
}

const TranslationsContext = createContext<TranslationsContextType | null>(null)

export function TranslationsProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState('en')

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[locale]
    
    for (const k of keys) {
      if (value === undefined) return key
      value = value[k]
    }

    return value || key
  }

  return (
    <TranslationsContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationsContext.Provider>
  )
}

export function useTranslations() {
  const context = useContext(TranslationsContext)
  if (!context) {
    throw new Error('useTranslations must be used within a TranslationsProvider')
  }
  return context
} 