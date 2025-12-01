// Made with love for my little baby — by Wassim
'use client'

export default function LoveMessage() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 md:p-12 transform transition-all hover:scale-[1.02]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-purple-500">
          To my baby, Fatimaezzahraa Oulhaj
        </h2>

        <div className="prose prose-lg max-w-none mb-8">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center italic mb-6">
            From the first moment, you became my baby, my whh, my frimija. This little game is nothing compared to what I feel for you, but I hope it makes you smile.
          </p>

          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="text-2xl font-bold text-pink-600 mb-4 text-center">
              Reasons I love you:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-2xl text-pink-500 mt-1">💖</span>
                <span>Your smile lights up my entire world</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-2xl text-pink-500 mt-1">💖</span>
                <span>The way you make me feel loved every single day</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-2xl text-pink-500 mt-1">💖</span>
                <span>Your kindness and beautiful heart</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-2xl text-pink-500 mt-1">💖</span>
                <span>How you understand me like no one else</span>
              </li>
              <li className="flex items-start gap-3 text-gray-700 text-lg">
                <span className="text-2xl text-pink-500 mt-1">💖</span>
                <span>Every moment with you feels like a dream</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-8 pt-6 border-t-2 border-pink-200">
            <p className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
              Forever yours,
            </p>
            <p className="text-xl md:text-2xl text-gray-700 mt-2">
              Wassim 💖
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

