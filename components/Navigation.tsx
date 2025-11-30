'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
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
    <nav className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-md z-50 border-b border-purple/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Logo />

          <div className="hidden md:flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-light hover:text-purple transition-colors duration-300 text-sm font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden text-light hover:text-secondary transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-secondary/20">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-4 py-2 text-light hover:text-secondary hover:bg-accent/30 rounded transition-colors"
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
