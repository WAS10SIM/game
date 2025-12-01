// Made with love for my little baby — by Wassim
'use client'

import { useState, useEffect } from 'react'
import Heart from '@/components/Heart'
import MessageBubble from '@/components/MessageBubble'
import FinalScreen from '@/components/FinalScreen'

const HEART_MESSAGES = [
  "hadik azen ❤️",
  "knbghik alghzala diali",
  "tigha bchwya 3la glbi hhhh",
  "kn7ma9 3la 7bk",
  "You feel like home.",
  "My heart chooses you.",
  "I miss you.",
  "You're the softest part of my world.",
  "You make everything feel warm.",
  "I'm sorry for the moments I wasn't enough.",
  "My baby… my peace.",
  "You are everything to me.",
  "I choose you. Always.",
  "You're my calm place.",
  "I see forever with you.",
  "You make my world complete.",
  "Every moment with you matters.",
  "You're my home, my heart, my everything.",
]

export default function Home() {
  const [hearts, setHearts] = useState([])
  const [messages, setMessages] = useState([])
  const [clickedCount, setClickedCount] = useState(0)
  const [showFinal, setShowFinal] = useState(false)
  const [usedMessages, setUsedMessages] = useState([])

  const getMessage = () => {
    const available = HEART_MESSAGES.map((_, idx) => idx).filter((idx) => !usedMessages.includes(idx))
    
    if (available.length === 0) {
      setUsedMessages([])
      const idx = Math.floor(Math.random() * HEART_MESSAGES.length)
      setUsedMessages([idx])
      return HEART_MESSAGES[idx]
    }
    
    const randomIdx = available[Math.floor(Math.random() * available.length)]
    setUsedMessages((prev) => [...prev, randomIdx])
    return HEART_MESSAGES[randomIdx]
  }

  useEffect(() => {
    const spawnHeart = () => {
      const x = 10 + Math.random() * 80 // 10% to 90% from left
      const y = -10 // Start below viewport
      const delay = Math.random() * 2 // Random delay for animation start
      
      setHearts((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x,
          y,
          delay,
        },
      ])
    }

    // Spawn hearts periodically
    const interval = setInterval(spawnHeart, 2000)
    
    // Initial hearts
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnHeart, i * 500)
    }

    return () => clearInterval(interval)
  }, [])

  const handleHeartClick = (heart) => {
    const message = getMessage()
    const newCount = clickedCount + 1

    setClickedCount(newCount)
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        x: heart.x,
        y: 20 + Math.random() * 30, // Random position near click
      },
    ])

    // Remove clicked heart
    setHearts((prev) => prev.filter((h) => h.id !== heart.id))

    // Show final screen after 10 clicks
    if (newCount >= 10 && !showFinal) {
      setTimeout(() => {
        setShowFinal(true)
      }, 1000)
    }
  }

  const handleMessageComplete = (id) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-red-100 -z-10" />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {!showFinal && (
          <>
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 mb-4">
                For my baby, my whh, my frimija
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mt-4">
                Click the hearts as they float by 💖
              </p>
              {clickedCount > 0 && (
                <p className="text-base md:text-lg text-pink-600 mt-2 font-semibold">
                  {clickedCount} / 10
                </p>
              )}
            </div>

            {/* Hearts container */}
            <div className="relative w-full h-[60vh] md:h-[70vh]">
              {hearts.map((heart) => (
                <Heart
                  key={heart.id}
                  x={heart.x}
                  y={heart.y}
                  onClick={() => handleHeartClick(heart)}
                  id={heart.id}
                  delay={heart.delay}
                />
              ))}

              {/* Floating messages */}
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg.message}
                  x={msg.x}
                  y={msg.y}
                  onComplete={() => handleMessageComplete(msg.id)}
                />
              ))}
            </div>
          </>
        )}

        {/* Final screen */}
        {showFinal && <FinalScreen />}
      </div>
    </div>
  )
}
