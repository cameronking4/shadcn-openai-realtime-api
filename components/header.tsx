"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { MobileNav } from "./mobile-nav";
import { Badge } from "./ui/badge";
import { siteConfig } from "@/config/site";
import { TwitterIcon, StarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslations } from "@/components/translations-context";

export function Header() {
  const { t } = useTranslations()
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full sticky top-0 z-50 border-b bg-background"
    >
      <div className="container mx-auto px-4 h-12 flex items-center justify-between gap-2">
        <MobileNav />
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-md:hidden flex items-center"
        >
          <Link href="/" className="flex gap-3 items-center">
            <motion.h1 
              className="text-lg font-medium tracking-tighter flex gap-1 items-center"
              whileHover={{ scale: 1.02 }}
            >
              {t('header.logo')}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Badge variant="outline" className="text-normal">
                {t('header.beta')}
              </Badge>
            </motion.div>
          </Link>
        </motion.nav>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-3 items-center justify-end ml-auto"
        >
          <LanguageSwitcher />
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Give a star on GitHub"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="flex gap-3 items-center max-md:h-9 max-md:w-9 max-md:px-0"
                aria-label="Give a star on GitHub"
              >
                <span className="hidden md:block">{t('header.github')}</span>{" "}
                <StarIcon className="motion-preset-spin motion-loop-twice"/>
              </Button>
            </motion.div>
          </Link>
          <Link
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Follow on Twitter"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="flex gap-3 items-center max-md:h-9 max-md:w-9 max-md:px-0"
                aria-label="Follow on Twitter"
              >
                <span className="hidden md:block">{t('header.twitter')}</span>{" "}
                <TwitterIcon />
              </Button>
            </motion.div>
          </Link>
          <ThemeSwitcher />
        </motion.div>
      </div>
    </motion.header>
  );
}
