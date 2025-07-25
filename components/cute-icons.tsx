import { Heart, Sparkles, Star, Gem, Palette, Crown, Flower, FlowerIcon as Butterfly } from "lucide-react"

export const CuteIcons = {
  Heart,
  Sparkles,
  Star,
  Gem,
  Palette,
  Crown,
  Flower,
  Butterfly,
}

export function FloatingIcons() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-20 left-10 animate-bounce">
        <Heart className="w-4 h-4 text-pink-300 opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-pulse">
        <Sparkles className="w-5 h-5 text-rose-300 opacity-50" />
      </div>
      <div className="absolute top-60 left-1/4 animate-bounce delay-300">
        <Gem className="w-3 h-3 text-pink-400 opacity-40" />
      </div>
      <div className="absolute bottom-40 right-10 animate-pulse delay-500">
        <Flower className="w-4 h-4 text-rose-300 opacity-50" />
      </div>
      <div className="absolute bottom-60 left-16 animate-bounce delay-700">
        <Butterfly className="w-5 h-5 text-pink-300 opacity-40" />
      </div>
    </div>
  )
}
