"use client"

import React, { useEffect, useState } from "react"
import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { tools } from "@/lib/tools"
import { Hero } from "./components/Hero"
import { VoiceSelector } from "./components/VoiceSelector"
import { BroadcastButton } from "./components/BroadcastButton"
import { StatusDisplay } from "./components/StatusDisplay"
import { TokenUsageDisplay } from "./components/TokenUsageDisplay"
import { MessageControls } from "./components/MessageControls"
import { ToolsEducation } from "./components/ToolsEducation"
import { motion } from "framer-motion"
import { timeFunction, backgroundFunction, partyFunction, launchWebsite, takeScreenshot, copyToClipboard } from "./components/tools-functions"

const App: React.FC = () => {
  // State for voice selection
  const [voice, setVoice] = useState("ash")

  // WebRTC Audio Session Hook
  const {
    status,
    isSessionActive,
    registerFunction,
    handleStartStopClick,
    msgs,
    conversation
  } = useWebRTCAudioSession(voice, tools)

  useEffect(() => {
    // Register all functions
    registerFunction('getCurrentTime', timeFunction)
    registerFunction('changeBackgroundColor', backgroundFunction)
    registerFunction('partyMode', partyFunction)
    registerFunction('launchWebsite', launchWebsite)
    registerFunction('takeScreenshot', takeScreenshot)
    registerFunction('copyToClipboard', copyToClipboard)
  }, [registerFunction])

  return (
    <main className="h-full">
      <motion.div 
        className="container flex flex-col items-center justify-center mx-auto max-w-3xl my-20 p-12 border rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Hero />
        
        <motion.div 
          className="w-full max-w-md bg-card text-card-foreground rounded-xl border shadow-sm p-6 space-y-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <VoiceSelector value={voice} onValueChange={setVoice} />
          
          <div className="flex flex-col items-center gap-4">
            <BroadcastButton 
              isSessionActive={isSessionActive} 
              onClick={handleStartStopClick}
            />
          </div>
          {msgs.length > 4 && <TokenUsageDisplay messages={msgs} />}
          {status && (
            <motion.div 
              className="w-full flex flex-col gap-2"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageControls conversation={conversation} msgs={msgs} />
            </motion.div>
          )}
        </motion.div>
        
        {status && <StatusDisplay status={status} />}
        <div className="w-full flex flex-col items-center gap-4">
          <ToolsEducation />
        </div>
      </motion.div>
    </main>
  )
}

export default App;