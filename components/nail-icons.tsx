import { Heart, Sparkles, Star, Gem, Palette, Crown, Flower, FlowerIcon as Butterfly } from "lucide-react"

// Custom nail icon component
export function NailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C8.5 2 6 4.5 6 8v8c0 3.5 2.5 6 6 6s6-2.5 6-6V8c0-3.5-2.5-6-6-6zm0 2c2.5 0 4 1.5 4 4v8c0 2.5-1.5 4-4 4s-4-1.5-4-4V8c0-2.5 1.5-4 4-4z" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    </svg>
  )
}

// Nail polish bottle icon
export function NailPolishIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="9" y="6" width="6" height="12" rx="1" fill="currentColor" />
      <rect x="10" y="4" width="4" height="3" rx="0.5" fill="currentColor" />
      <circle cx="12" cy="12" r="2" fill="white" opacity="0.3" />
    </svg>
  )
}

// Nail file icon
export function NailFileIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="4" y="10" width="16" height="4" rx="2" fill="currentColor" />
      <rect x="6" y="11" width="12" height="2" rx="1" fill="white" opacity="0.3" />
    </svg>
  )
}

// Hand with nails icon
export function HandNailsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c-1 0-2 1-2 2v4h4V4c0-1-1-2-2-2z" />
      <path d="M8 3c-1 0-2 1-2 2v3h4V5c0-1-1-2-2-2z" />
      <path d="M16 3c-1 0-2 1-2 2v3h4V5c0-1-1-2-2-2z" />
      <path d="M6 8v8c0 2 1 3 3 3h6c2 0 3-1 3-3V8H6z" />
      <circle cx="8" cy="4" r="1" fill="#ff69b4" />
      <circle cx="12" cy="3" r="1" fill="#ff1493" />
      <circle cx="16" cy="4" r="1" fill="#ff69b4" />
    </svg>
  )
}

export const CuteIcons = {
  Heart,
  Sparkles,
  Star,
  Gem,
  Palette,
  Crown,
  Flower,
  Butterfly,
  NailIcon,
  NailPolishIcon,
  NailFileIcon,
  HandNailsIcon,
}

export function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-20 left-10 animate-bounce">
        <Heart className="w-4 h-4 text-pink-300 opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <NailPolishIcon className="w-5 h-5 text-rose-400 opacity-50" />
      </div>
      <div className="absolute top-60 left-1/4 animate-bounce delay-300">
        <NailIcon className="w-4 h-4 text-pink-400 opacity-40" />
      </div>
      <div className="absolute bottom-40 right-10 animate-pulse delay-500">
        <Flower className="w-4 h-4 text-rose-300 opacity-50" />
      </div>
      <div className="absolute bottom-60 left-16 animate-bounce delay-700">
        <HandNailsIcon className="w-6 h-6 text-pink-300 opacity-40" />
      </div>
      <div className="absolute top-32 right-1/3 animate-pulse delay-1000">
        <NailFileIcon className="w-4 h-4 text-pink-400 opacity-50" />
      </div>
      <div className="absolute bottom-32 left-1/3 animate-bounce delay-1200">
        <Sparkles className="w-3 h-3 text-rose-300 opacity-60" />
      </div>
      <div className="absolute top-80 left-20 animate-pulse delay-1500">
        <Gem className="w-4 h-4 text-pink-300 opacity-40" />
      </div>
    </div>
  )
}
