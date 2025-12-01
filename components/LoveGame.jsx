// Made with love for Fatimaezzahraa Oulhaj by Wassim
'use client'

import { useState, useEffect, useRef } from 'react'

const LOVE_MESSAGES = [
  "I love you",
  "You are my baby",
  "My frimija",
  "My whh",
  "You're amazing",
  "My heart",
]

export default function LoveGame({ onGameEnd, onShowMessage }) {
  const [hearts, setHearts] = useState([])
  const [playerX, setPlayerX] = useState(50) // percentage from left
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameActive, setGameActive] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [floatingMessages, setFloatingMessages] = useState([])
  const [gameOver, setGameOver] = useState(false)
  const gameAreaRef = useRef(null)
  const animationFrameRef = useRef(null)
  const keysRef = useRef({ left: false, right: false })

  const PLAYER_WIDTH = 10 // percentage
  const HEART_SIZE = 30 // pixels

  useEffect(() => {
    if (!gameActive) return

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') keysRef.current.left = true
      if (e.key === 'ArrowRight') keysRef.current.right = true
    }

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft') keysRef.current.left = false
      if (e.key === 'ArrowRight') keysRef.current.right = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    const movePlayer = () => {
      setPlayerX((prev) => {
        let newX = prev
        if (keysRef.current.left && newX > 0) {
          newX = Math.max(0, newX - 2)
        }
        if (keysRef.current.right && newX < 100 - PLAYER_WIDTH) {
          newX = Math.min(100 - PLAYER_WIDTH, newX + 2)
        }
        return newX
      })
    }

    const interval = setInterval(movePlayer, 16)
    return () => clearInterval(interval)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive) return

    const spawnHeart = () => {
      const x = Math.random() * (100 - PLAYER_WIDTH) + PLAYER_WIDTH / 2
      const speed = 1 + Math.random() * 2
      setHearts((prev) => [...prev, { id: Date.now(), x, y: 0, speed }])
    }

    const heartInterval = setInterval(spawnHeart, 800)
    return () => clearInterval(heartInterval)
  }, [gameActive])

  useEffect(() => {
    if (!gameActive || gameOver) return

    const gameLoop = () => {
      setHearts((prevHearts) => {
        return prevHearts
          .map((heart) => ({
            ...heart,
            y: heart.y + heart.speed,
          }))
          .filter((heart) => {
            // Check collision
            if (heart.y > 85) {
              const heartLeft = heart.x - (HEART_SIZE / 2) / (window.innerWidth / 100)
              const heartRight = heart.x + (HEART_SIZE / 2) / (window.innerWidth / 100)
              const playerLeft = playerX
              const playerRight = playerX + PLAYER_WIDTH

              if (heartRight >= playerLeft && heartLeft <= playerRight) {
                // Caught!
                setScore((prev) => prev + 1)
                const message = LOVE_MESSAGES[Math.floor(Math.random() * LOVE_MESSAGES.length)]
                const messageId = Date.now()
                setFloatingMessages((prev) => [
                  ...prev,
                  {
                    id: messageId,
                    text: message,
                    x: heart.x,
                  },
                ])
                setTimeout(() => {
                  setFloatingMessages((prev) => prev.filter((m) => m.id !== messageId))
                }, 2000)
                return false
              }
            }
            return heart.y < 100
          })
      })

      animationFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animationFrameRef.current = requestAnimationFrame(gameLoop)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [gameActive, playerX, gameOver])

  useEffect(() => {
    if (!gameActive || gameOver) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true)
          setGameActive(false)
          if (onGameEnd) onGameEnd(score)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive, gameOver, score, onGameEnd])

  const startGame = () => {
    setGameStarted(true)
    setGameActive(true)
    setScore(0)
    setTimeLeft(45)
    setHearts([])
    setGameOver(false)
    setFloatingMessages([])
  }

  const moveLeft = () => {
    setPlayerX((prev) => Math.max(0, prev - 5))
  }

  const moveRight = () => {
    setPlayerX((prev) => Math.min(100 - PLAYER_WIDTH, prev + 5))
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="text-center mb-6 space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 animate-pulse">
          For my baby, my whh, my frimija
        </h2>
        <p className="text-xl md:text-2xl text-gray-700 font-semibold">
          I love you, Fatimaezzahraa Oulhaj
        </p>
      </div>

      {!gameStarted ? (
        <div className="text-center py-12">
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xl font-bold rounded-xl shadow-lg hover:from-pink-600 hover:to-red-600 transform hover:scale-110 transition-all duration-300"
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold text-pink-600">
                Score: <span className="text-red-500">{score}</span>
              </div>
              <div className="text-2xl font-bold text-purple-600">
                Time: <span className={timeLeft <= 10 ? 'text-red-500 animate-pulse' : ''}>{timeLeft}s</span>
              </div>
            </div>

            <div
              ref={gameAreaRef}
              className="relative w-full h-96 bg-gradient-to-b from-pink-100 via-purple-100 to-red-100 rounded-xl overflow-hidden border-4 border-pink-200"
            >
              {/* Hearts */}
              {hearts.map((heart) => (
                <div
                  key={heart.id}
                  className="absolute text-3xl animate-bounce"
                  style={{
                    left: `${heart.x}%`,
                    top: `${heart.y}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  💖
                </div>
              ))}

              {/* Floating messages */}
              {floatingMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="absolute text-lg font-bold text-pink-600 animate-pulse"
                  style={{
                    left: `${msg.x}%`,
                    top: '40%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  {msg.text}
                </div>
              ))}

              {/* Player */}
              <div
                className="absolute bottom-4 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold px-4 py-2 rounded-full shadow-lg transform transition-all"
                style={{
                  left: `${playerX}%`,
                  width: `${PLAYER_WIDTH}%`,
                  textAlign: 'center',
                }}
              >
                Wassim
              </div>
            </div>

            {/* Mobile controls */}
            <div className="flex justify-center gap-4 mt-4 md:hidden">
              <button
                onTouchStart={moveLeft}
                onMouseDown={moveLeft}
                className="px-6 py-3 bg-pink-500 text-white rounded-lg font-bold shadow-md active:bg-pink-600"
              >
                ← Left
              </button>
              <button
                onTouchStart={moveRight}
                onMouseDown={moveRight}
                className="px-6 py-3 bg-red-500 text-white rounded-lg font-bold shadow-md active:bg-red-600"
              >
                Right →
              </button>
            </div>

            {gameOver && (
              <div className="mt-6 text-center space-y-4">
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
                  Game Over!
                </div>
                <div className="text-xl text-gray-700">
                  Final Score: <span className="font-bold text-pink-600">{score}</span>
                </div>
                <p className="text-lg text-gray-600 italic">
                  No matter the score, my love for you is infinite, Fatimaezzahraa ❤️
                </p>
                <button
                  onClick={() => {
                    if (onShowMessage) onShowMessage()
                  }}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-lg shadow-lg hover:from-pink-600 hover:to-red-600 transform hover:scale-105 transition-all"
                >
                  Read my message
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}

