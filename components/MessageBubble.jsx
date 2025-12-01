// Made with love for my little baby — by Wassim
'use client'

export default function MessageBubble({ message, x, y, onComplete }) {
  return (
    <div
      className="absolute pointer-events-none z-20"
      style={{
        left: `${x}%`,
        bottom: `${y}%`,
        transform: 'translateX(-50%)',
        animation: 'fadeUp 3s ease-out forwards',
      }}
      onAnimationEnd={onComplete}
    >
      <div className="bg-white/90 backdrop-blur-md rounded-3xl px-5 py-4 shadow-2xl border border-pink-200/50 transform transition-all">
        <p className="text-sm md:text-base font-medium text-pink-700 whitespace-nowrap">
          {message}
        </p>
      </div>
    </div>
  )
}

