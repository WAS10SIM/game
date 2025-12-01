// Made with love for Fatimaezzahraa Oulhaj by Wassim
'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import LoveGame from '@/components/LoveGame'
import LoveMessage from '@/components/LoveMessage'

export default function GamePage() {
  const [showMessage, setShowMessage] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const handleGameEnd = (score) => {
    setFinalScore(score)
  }

  const handleShowMessage = () => {
    setShowMessage(true)
    // Smooth scroll to message
    setTimeout(() => {
      const messageElement = document.getElementById('love-message')
      if (messageElement) {
        messageElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <LoveGame onGameEnd={handleGameEnd} onShowMessage={handleShowMessage} />
        
        {showMessage && (
          <div id="love-message" className="mt-12">
            <LoveMessage />
          </div>
        )}
      </div>
    </div>
  )
}

