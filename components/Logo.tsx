'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <div className="w-20 h-20 relative flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="Merci Saint-Esprit Église"
          width={80}
          height={80}
          className="w-full h-full object-contain"
          priority
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold text-light leading-none">Merci Saint-Esprit</span>
        <div className="flex justify-end">
          <span className="text-xs font-bold text-rose-500 mt-2">Église</span>
        </div>
      </div>
    </div>
  )
}
