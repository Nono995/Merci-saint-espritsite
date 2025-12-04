'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const biblicalVerses = [
    { text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point.", reference: "Jean 3:16" },
    { text: "Que la grâce du Seigneur Jésus-Christ, l'amour de Dieu, et la communion du Saint-Esprit soient avec vous tous.", reference: "2 Corinthiens 13:13" },
    { text: "Jésus dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.", reference: "Jean 14:6" },
    { text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse.", reference: "Proverbes 3:5" }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % biblicalVerses.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [biblicalVerses.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      <div className="absolute inset-0 lg:flex">
        <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        
        <svg
          className="absolute hidden lg:block right-1/2 top-0 bottom-0 w-32 h-full text-white"
          viewBox="0 0 100 1000"
          preserveAspectRatio="none"
          style={{ filter: 'drop-shadow(4px 0 20px rgba(0,0,0,0.1))' }}
        >
          <polygon points="100,0 0,0 100,1000" fill="white" />
        </svg>

        <div className="absolute hidden lg:block inset-y-0 right-0 opacity-30">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-secondary to-rose-500 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
          <div className="absolute bottom-20 right-40 w-80 h-80 bg-gradient-to-br from-accent to-purple rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto min-h-screen lg:h-screen flex flex-col lg:flex-row items-center py-8 lg:py-0">
        <motion.div
          className="w-full lg:w-1/2 px-6 sm:px-6 lg:px-12 pt-24 sm:pt-32 lg:pt-0 flex flex-col justify-center items-center lg:items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6 lg:mb-10">
            <motion.span 
              className="inline-flex items-center gap-2 text-rose-600 font-bold text-xs sm:text-sm tracking-wider uppercase px-4 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-rose-50 to-orange-50 rounded-full border border-rose-200/50 shadow-soft relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <motion.span
                animate={{ 
                  rotate: [0, 10, -10, 10, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                ✨
              </motion.span>
              <span className="relative z-10">Bienvenue</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-rose-100 to-orange-100"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut"
                }}
              />
            </motion.span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6 lg:mb-8 w-full">
            <div className="flex flex-col items-center lg:items-start gap-1">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight whitespace-nowrap">
                Merci Saint-Esprit
              </h1>
              <div className="flex justify-center lg:justify-start w-full pl-[55%] sm:pl-[58%] lg:pl-[60%]">
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-secondary via-rose-500 to-rose-600 bg-clip-text text-transparent">
                  Église
                </p>
              </div>
            </div>
          </motion.div>

          {/* Decorative Line */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center gap-3 mb-6 lg:mb-8 w-full justify-center lg:justify-start"
          >
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-secondary"></div>
            <div className="w-2 h-2 rounded-full bg-secondary"></div>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-secondary"></div>
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-gray-600 mb-8 lg:mb-10 leading-relaxed max-w-lg text-center lg:text-left font-light"
          >
            Une communauté accueillante où la foi, l'espérance et la charité se vivent au quotidien. Rejoignez-nous pour des services inspirants et une croissance spirituelle profonde.
          </motion.p>



          <motion.div
            variants={itemVariants}
            className="hidden lg:flex flex-col sm:flex-row gap-4 justify-center lg:justify-start w-full sm:w-auto"
          >
            <a
              href="#contact"
              className="group relative bg-gradient-to-r from-secondary to-rose-500 text-white font-bold text-base px-8 py-4 rounded-xl hover:shadow-strong transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Nous Rejoindre</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden lg:flex items-center gap-3 mt-8 lg:mt-12 text-sm text-gray-500 text-center lg:text-left">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-rose-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-purple-dark border-2 border-white"></div>
            </div>
            <p className="font-medium">Rejoignez <span className="text-gray-900 font-bold">500+</span> membres</p>
          </motion.div>


        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 px-4 sm:px-6 lg:px-0 py-4 sm:py-6 lg:py-20 flex flex-col items-center justify-center relative"
          variants={imageVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="relative w-full h-[380px] sm:h-[420px] sm:max-w-2xl lg:max-w-none lg:w-5/6 lg:h-[480px]">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-rose-500/20 rounded-3xl blur-2xl transform scale-105"></div>
            
            <Image
              src="/images/img5.jpg"
              alt="Merci Saint-Esprit Église"
              fill
              className="object-cover rounded-3xl relative z-10 shadow-strong"
              priority
              sizes="(max-width: 768px) 90vw, 50vw"
            />
            
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-gray-900/60 via-gray-900/20 to-transparent z-20" />
            
            <motion.div
              className="absolute -bottom-6 left-0 right-0 mx-auto w-11/12 glass-dark rounded-2xl p-4 shadow-strong border border-white/20 z-30"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative flex items-center">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <p className="text-white text-xs sm:text-sm font-light italic mb-2 leading-relaxed">
                    "{biblicalVerses[currentSlide].text}"
                  </p>
                  <p className="text-secondary text-xs font-semibold">
                    — {biblicalVerses[currentSlide].reference}
                  </p>
                </motion.div>
              </div>

              <div className="flex justify-center gap-2 mt-3">
                {biblicalVerses.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-gradient-to-r from-secondary to-rose-500 w-8'
                        : 'bg-white/30 w-1.5 hover:bg-white/50'
                    }`}
                    whileHover={{ scale: 1.2 }}
                  />
                ))}
              </div>
            </motion.div>
            
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-gradient-to-br from-secondary/30 to-rose-500/30 rounded-full blur-3xl -z-10 hidden lg:block animate-float" />
          </div>

          <motion.div
            variants={itemVariants}
            className="lg:hidden flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto mt-8"
          >
            <a
              href="#contact"
              className="group relative bg-gradient-to-r from-secondary to-rose-500 text-white font-bold text-base px-8 py-4 rounded-xl hover:shadow-strong transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Nous Rejoindre</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:hidden flex items-center justify-center gap-3 mt-6 text-sm text-gray-500">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-rose-500 border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple border-2 border-white"></div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-purple-dark border-2 border-white"></div>
            </div>
            <p className="font-medium">Rejoignez <span className="text-gray-900 font-bold">500+</span> membres</p>
          </motion.div>


        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8 text-secondary" />
      </motion.div>
    </section>
  )
}
