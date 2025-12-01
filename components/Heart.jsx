// Made with love for my little baby — by Wassim
'use client'

export default function Heart({ x, y, onClick, id, delay = 0 }) {
  return (
    <button
      onClick={onClick}
      className="absolute text-4xl md:text-5xl cursor-pointer transition-all duration-300 hover:scale-125 active:scale-110 focus:outline-none heart-float"
      style={{
        left: `${x}%`,
        bottom: `${y}%`,
        transform: 'translateX(-50%)',
        animationDelay: `${delay}s`,
      }}
      aria-label="Click me"
    >
      💖
    </button>
  )
}
