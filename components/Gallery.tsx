'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Sparkles, Calendar, Users } from 'lucide-react'
import Image from 'next/image'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const galleryItems = [
    { id: 1, title: 'Moment Spirituel', imageUrl: '/images/img1.jpg', category: 'Culte', date: 'Décembre 2024', attendees: 250 },
    { id: 2, title: 'Communion', imageUrl: '/images/img2.jpg', category: 'Célébration', date: 'Novembre 2024', attendees: 180 },
    { id: 3, title: 'Célébration', imageUrl: '/images/img3.jpg', category: 'Événement', date: 'Octobre 2024', attendees: 320 },
    { id: 4, title: 'Prière', imageUrl: '/images/img1.jpg', category: 'Culte', date: 'Septembre 2024', attendees: 200 },
    { id: 5, title: 'Enseignement', imageUrl: '/images/img2.jpg', category: 'Formation', date: 'Août 2024', attendees: 150 },
    { id: 6, title: 'Communauté', imageUrl: '/images/img3.jpg', category: 'Rencontre', date: 'Juillet 2024', attendees: 280 },
    { id: 7, title: 'Partage', imageUrl: '/images/img1.jpg', category: 'Événement', date: 'Juin 2024', attendees: 190 },
    { id: 8, title: 'Foi', imageUrl: '/images/img2.jpg', category: 'Culte', date: 'Mai 2024', attendees: 220 },
  ]

  const categories = ['Tous', 'Culte', 'Célébration', 'Événement', 'Formation', 'Rencontre']

  const filteredItems = activeFilter === 'Tous' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter)

  // Bento Grid Layout Pattern
  const getBentoClass = (index: number) => {
    const patterns = [
      'md:col-span-2 md:row-span-2', // Large featured
      'md:col-span-1 md:row-span-1', // Regular
      'md:col-span-1 md:row-span-1', // Regular
      'md:col-span-2 md:row-span-1', // Wide
      'md:col-span-1 md:row-span-1', // Regular
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-1 md:row-span-1', // Regular
      'md:col-span-2 md:row-span-1', // Wide
    ]
    return patterns[index % patterns.length]
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % filteredItems.length)
    }
  }

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + filteredItems.length) % filteredItems.length)
    }
  }

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-4">
            <Sparkles size={16} />
            <span className="font-semibold text-sm tracking-wide">Nos Souvenirs</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Galerie Photos
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Revivez les moments forts de notre communauté
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-gradient-to-r from-secondary to-rose-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[280px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedImage(index)}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl ${getBentoClass(index)}`}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  {/* Category Badge */}
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-xs font-semibold rounded-full border border-white/30">
                      {item.category}
                    </span>
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/30">
                      <Sparkles size={18} className="text-white" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-display font-bold text-xl md:text-2xl mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={14} />
                        <span>{item.attendees}+</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/30 rounded-3xl transition-colors duration-300" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-rose-500 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <span className="relative z-10 flex items-center gap-2">
              Voir Plus de Photos
              <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Modern Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl"
            >
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video">
                  <Image
                    src={filteredItems[selectedImage].imageUrl}
                    alt={filteredItems[selectedImage].title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Info Bar */}
              <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
                      {filteredItems[selectedImage].title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/70">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {filteredItems[selectedImage].date}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users size={16} />
                        {filteredItems[selectedImage].attendees}+ participants
                      </span>
                    </div>
                  </div>
                  <div className="text-white/50 text-sm">
                    {selectedImage + 1} / {filteredItems.length}
                  </div>
                </div>
              </div>

              {/* Controls */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-16 right-0 w-12 h-12 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <X size={24} className="mx-auto" />
              </button>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <ChevronLeft size={28} className="mx-auto" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-xl text-white rounded-full hover:bg-white/20 transition-all border border-white/20"
              >
                <ChevronRight size={28} className="mx-auto" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
