// Made with love for Fatimaezzahraa Oulhaj by Wassim
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-sm shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition-all">
            Love for Baby
          </Link>
          <div className="flex gap-4">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg text-pink-600 hover:bg-pink-50 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/game" 
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 transition-all font-medium shadow-md"
            >
              Play Game
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

