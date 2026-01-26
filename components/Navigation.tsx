'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { name: 'Accueil', href: '#home' },
    { name: 'À propos', href: '#about' },
    { name: 'Communauté', href: '#community' },
    { name: 'Services', href: '#services' },
    { name: 'Événements', href: '#events' },
    { name: 'Podcasts', href: '#podcasts' },
    { name: 'Vidéos', href: '#videos' },
    { name: 'Galerie', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 glass-dark z-50 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-24">
          <Logo />

          <div className="hidden md:flex gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-light/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-secondary to-rose-500 group-hover:w-3/4 transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-light hover:text-secondary transition-colors p-2 hover:bg-white/10 rounded-lg"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-white/10 pt-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-3 text-light/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
