// Made with love for my little baby — by Wassim
import './globals.css'

export const metadata = {
  title: 'For my little baby',
  description: 'A special experience made with love',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
