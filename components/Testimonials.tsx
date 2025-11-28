'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import Image from 'next/image'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Claire Martin',
      role: 'Membre depuis 3 ans',
      text: 'Grace & Faith a changé ma vie. J\'ai trouvé ici une communauté chaleureuse et un enseignement qui me parle vraiment.',
      rating: 5,
      image: '/images/img1.jpg',
    },
    {
      name: 'Thomas Lefevre',
      role: 'Nouveau Membre',
      text: 'Dès mon premier dimanche, j\'ai senti que j\'avais trouvé ma place. Les services sont inspirants et les gens sont accueillants.',
      rating: 5,
      image: '/images/img2.jpg',
    },
    {
      name: 'Marie Rousseau',
      role: 'Parent',
      text: 'Les programmes jeunesse sont exceptionnels. Mes enfants aiment venir et apprennent des valeurs importantes.',
      rating: 5,
      image: '/images/img3.jpg',
    },
    {
      name: 'Jean Dupuis',
      role: 'Volontaire',
      text: 'C\'est une honneur de servir dans cette église. L\'atmosphère et la vision sont vraiment exceptionnelles.',
      rating: 5,
      image: '/images/img1.jpg',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-light to-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-4">Témoignages</h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6" />
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Ce que nos membres disent de Grace & Faith
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-secondary"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 shadow-md border-2 border-secondary">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-secondary text-secondary"
                    />
                  ))}
                </div>
              </div>

              <p className="text-primary/70 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>

              <div>
                <p className="font-bold text-primary">{testimonial.name}</p>
                <p className="text-secondary text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
