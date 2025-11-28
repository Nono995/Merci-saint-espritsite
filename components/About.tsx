'use client'

import { motion } from 'framer-motion'
import { Heart, Users, BookOpen } from 'lucide-react'
import Image from 'next/image'

export default function About() {
  const features = [
    {
      icon: Heart,
      title: 'Foi Authentique',
      description: 'Une pratique spirituelle sincère basée sur les valeurs éternelles',
    },
    {
      icon: Users,
      title: 'Communauté Accueillante',
      description: 'Un espace où chacun trouve sa place et se sent appartenir',
    },
    {
      icon: BookOpen,
      title: 'Enseignement Enrichissant',
      description: 'Des messages profonds et pertinents pour votre vie',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="about" className="py-20 bg-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-4">À Propos de Nous</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Grace & Faith est une église moderne dédiée à l'épanouissement spirituel et communautaire
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/img1.jpg"
                alt="Église - Merci Saint-Esprit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-primary">Notre Mission</h3>
            <p className="text-primary/70 leading-relaxed text-lg">
              Nous croyons en une foi active, authentique et transformatrice. Notre mission est de créer un espace où les gens peuvent grandir spirituellement, trouver du soutien communautaire et vivre l'impact du Christ dans leur vie quotidienne.
            </p>
            <p className="text-primary/70 leading-relaxed text-lg">
              Avec des services modernes, une communauté chaleureuse et un engagement envers les services d'intérêt général, nous sommes là pour vous accompagner dans votre parcours spirituel.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-t-4 border-secondary"
              >
                <Icon className="w-12 h-12 text-secondary mb-4" />
                <h4 className="text-xl font-bold text-primary mb-3">{feature.title}</h4>
                <p className="text-primary/60 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
