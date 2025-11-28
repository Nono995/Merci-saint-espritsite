'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface Slide {
  id: number
  imageUrl: string
  message: string
  subtitle: string
}

export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slides: Slide[] = [
    {
      id: 1,
      imageUrl: '/images/slider-1.jpg',
      message: 'Bienvenue à Merci Saint-Esprit Église',
      subtitle: 'Une communauté de foi et d\'espérance',
    },
    {
      id: 2,
      imageUrl: '/images/slider-2.jpg',
      message: 'Découvrez la puissance de la Grâce',
      subtitle: 'Transformez votre vie spirituelle',
    },
    {
      id: 3,
      imageUrl: '/images/slider-3.jpg',
      message: 'L\'Amour est le fondement de notre foi',
      subtitle: 'Rejoignez notre famille en Christ',
    },
    {
      id: 4,
      imageUrl: '/images/slider-4.jpg',
      message: 'Ensemble, nous construisons une Église forte',
      subtitle: 'Croissance, partage et communion',
    },
    {
      id: 5,
      imageUrl: '/images/slider-5.jpg',
      message: 'L\'Esprit Saint guide notre chemin',
      subtitle: 'Espérance et liberté en Dieu',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [slides.length])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % slides.length)
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-primary to-accent">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.4 },
          }}
          drag="x"
          dragElastic={1}
          dragConstraints={{ left: 0, right: 0 }}
          dragTransition={{
            power: 0.2,
            restDelta: 100,
          }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x)

            if (swipe < -swipeConfidenceThreshold) {
              handleNext()
            } else if (swipe > swipeConfidenceThreshold) {
              handlePrev()
            }
          }}
          className="absolute inset-0"
        >
          <div className="relative w-full h-full">
            <Image
              src={slides[currentIndex].imageUrl}
              alt={slides[currentIndex].message}
              fill
              className="object-cover"
              priority
              onError={(e) => {
                const img = e.target as HTMLImageElement
                img.style.display = 'none'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60" />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-light mb-4 max-w-4xl leading-tight drop-shadow-2xl"
              >
                {slides[currentIndex].message}
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg md:text-2xl text-light/90 max-w-3xl drop-shadow-lg font-light tracking-wide"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 bg-secondary/30 hover:bg-secondary/60 text-light p-2 rounded-full transition-all duration-300 backdrop-blur-md group"
        aria-label="Previous slide"
      >
        <ChevronLeft size={28} className="group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 bg-secondary/30 hover:bg-secondary/60 text-light p-2 rounded-full transition-all duration-300 backdrop-blur-md group"
        aria-label="Next slide"
      >
        <ChevronRight size={28} className="group-hover:scale-110 transition-transform" />
      </button>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'bg-secondary w-8 h-2'
                : 'bg-light/40 hover:bg-light/60 w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-20"
      >
        <div className="flex items-center gap-2 bg-black/40 hover:bg-black/60 px-4 py-2 rounded-full backdrop-blur-md transition-all duration-300">
          <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
          <span className="text-light text-xs md:text-sm font-semibold tracking-wider">
            {String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </motion.div>
    </div>
  )
}
