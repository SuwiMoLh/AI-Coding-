import { NailIcon, NailPolishIcon } from "./nail-icons"

export function NailArtDisplay() {
  const nailColors = ["text-pink-400", "text-rose-400", "text-red-400", "text-purple-400", "text-blue-400"]

  return (
    <div className="flex items-center justify-center space-x-2 my-8">
      {nailColors.map((color, index) => (
        <div key={index} className="relative">
          <NailIcon className={`w-8 h-8 ${color} transform hover:scale-110 transition-transform cursor-pointer`} />
          <div className={`absolute -top-1 -right-1 w-2 h-2 ${color} rounded-full animate-pulse`}></div>
        </div>
      ))}
    </div>
  )
}

export function ServiceNailIcons({ serviceType }: { serviceType: string }) {
  const getServiceIcon = (type: string) => {
    if (type.includes("เจล")) return <NailPolishIcon className="w-5 h-5 text-pink-500" />
    if (type.includes("ต่อ")) return <NailIcon className="w-5 h-5 text-purple-500" />
    if (type.includes("มานิ") || type.includes("เพดิ")) return <NailIcon className="w-5 h-5 text-blue-500" />
    return <NailIcon className="w-5 h-5 text-pink-500" />
  }

  return getServiceIcon(serviceType)
}
