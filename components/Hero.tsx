'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="home"
      className="relative w-full h-screen pt-20 overflow-hidden bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
      </div>

      <motion.div
        className="relative z-10 text-center max-w-4xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-block"
        >
          <span className="text-rose-500 font-semibold text-lg tracking-widest uppercase">
            Bienvenue
          </span>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6 w-full">
          <div className="flex flex-col items-center gap-1">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-light leading-tight">
              Merci Saint-Esprit
            </h1>
            <div className="flex justify-center md:justify-end w-full">
              <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-rose-500 md:pr-0">Église</p>
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-xl text-light/80 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Rejoignez-nous pour des services inspirants, une communauté accueillante et un engagement profond envers la croissance spirituelle
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <a href="#contact" className="bg-secondary text-primary font-bold px-8 py-4 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 inline-block text-center">
            Rejoignez-nous
          </a>
          <a href="#about" className="border-2 border-secondary text-secondary font-bold px-8 py-4 rounded-lg hover:bg-secondary/10 transition-all duration-300 inline-block text-center">
            En savoir plus
          </a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-secondary mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-light to-transparent" />
    </section>
  )
}
