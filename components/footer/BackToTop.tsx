import { useState } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  if (typeof window !== 'undefined') {
    // Safe — this component only renders client-side (footer is 'use client')
    window.onscroll = () => setVisible(window.scrollY > 400)
  }

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 w-12 h-12
                 bg-gradient-to-br from-[#02644A] to-emerald-500
                 hover:from-emerald-600 hover:to-[#02644A]
                 text-white rounded-full shadow-2xl z-50
                 flex items-center justify-center
                 hover:scale-110 transition-all duration-300"
    >
      ↑
    </button>
  )
}