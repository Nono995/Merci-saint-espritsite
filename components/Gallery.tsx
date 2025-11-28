'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryItems = [
    { id: 1, title: 'Moment Spirituel', imageUrl: '/images/img1.jpg' },
    { id: 2, title: 'Communion', imageUrl: '/images/img2.jpg' },
    { id: 3, title: 'Célébration', imageUrl: '/images/img3.jpg' },
    { id: 4, title: 'Prière', imageUrl: '/images/img1.jpg' },
    { id: 5, title: 'Enseignement', imageUrl: '/images/img2.jpg' },
    { id: 6, title: 'Communauté', imageUrl: '/images/img3.jpg' },
    { id: 7, title: 'Partage', imageUrl: '/images/img1.jpg' },
    { id: 8, title: 'Foi', imageUrl: '/images/img2.jpg' },
    { id: 9, title: 'Espérance', imageUrl: '/images/img3.jpg' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const handleNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryItems.length)
    }
  }

  const handlePrev = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryItems.length) % galleryItems.length)
    }
  }

  return (
    <section id="gallery" className="py-20 bg-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-4">Galerie Photos</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Découvrez les moments spéciaux de notre communauté
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              onClick={() => setSelectedImage(index)}
              className="relative h-56 sm:h-64 md:h-72 cursor-pointer group overflow-hidden rounded-2xl shadow-lg"
            >
              <Image
                src={item.imageUrl}
                alt={item.title}
                fill
                className="object-cover group-hover:brightness-75 transition-all duration-300"
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
                <p className="text-white font-bold text-center px-4 text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-4 right-4 bg-secondary text-primary w-10 h-10 rounded-full flex items-center justify-center font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                +
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl"
            >
              <div className="relative rounded-2xl aspect-video overflow-hidden">
                <Image
                  src={galleryItems[selectedImage].imageUrl}
                  alt={galleryItems[selectedImage].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {galleryItems[selectedImage].title}
                </h3>
                <p className="text-light/70">
                  Photo {selectedImage + 1} de {galleryItems.length}
                </p>
              </div>

              <div className="absolute top-4 right-4 button z-10">
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-secondary text-primary p-2 rounded-full hover:bg-secondary/90 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-secondary/80 text-primary p-3 rounded-full hover:bg-secondary transition-all"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-secondary/80 text-primary p-3 rounded-full hover:bg-secondary transition-all"
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
