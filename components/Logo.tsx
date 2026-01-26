'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center -ml-2 md:ml-0">
      <div className="w-24 h-24 md:w-28 md:h-28 relative flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Merci Saint-Esprit Église"
          width={112}
          height={112}
          className="w-full h-full object-contain"
          priority
        />
      </div>
    </div>
  )
}
