'use client'

import { motion } from 'framer-motion'
import { Heart, Gift } from 'lucide-react'

export default function CTA() {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary via-accent to-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold text-light mb-6">Prêt à Rejoindre Notre Communauté?</h2>
          <p className="text-xl text-light/80 leading-relaxed">
            Que vous soyez à la recherche d'une communauté spirituelle, d'un soutien ou simplement curieux, nous vous accueillons à bras ouverts.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md border border-secondary/30 rounded-2xl p-8 hover:border-secondary/60 transition-all duration-300 cursor-pointer hover:scale-105 transform">
            <Heart className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-2xl font-bold text-light mb-3">Rejoignez-Nous</h3>
            <p className="text-light/70 mb-6">
              Venez découvrir notre communauté accueillante et chaleureuse.
            </p>
            <a href="#services" className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 inline-block text-center">
              Planifier Ma Visite
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-secondary/30 rounded-2xl p-8 hover:border-secondary/60 transition-all duration-300 cursor-pointer hover:scale-105 transform">
            <Gift className="w-12 h-12 text-secondary mb-4" />
            <h3 className="text-2xl font-bold text-light mb-3">Contribuer</h3>
            <p className="text-light/70 mb-6">
              Supportez notre mission et faites une différence dans nos communautés.
            </p>
            <a href="#contact" className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 inline-block text-center">
              Faire un Don
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md border border-secondary/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-light mb-6 text-center">Contactez-Nous</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-light/70 text-sm mb-2">Adresse</p>
              <p className="text-light font-semibold">123 Rue de la Foi</p>
              <p className="text-light/70">Ville, Pays</p>
            </div>
            <div>
              <p className="text-light/70 text-sm mb-2">Téléphone</p>
              <p className="text-light font-semibold">+33 (0)1 23 45 67 89</p>
              <p className="text-light/70">Lun-Ven: 09:00-17:00</p>
            </div>
            <div>
              <p className="text-light/70 text-sm mb-2">Email</p>
              <p className="text-light font-semibold">contact@graceAndFaith.fr</p>
              <p className="text-light/70">Réponse en 24h</p>
            </div>
          </div>

          <form className="mt-8 max-w-2xl mx-auto space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Votre nom"
                className="w-full bg-white/10 border border-light/30 rounded-lg px-4 py-3 text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors"
              />
              <input
                type="email"
                placeholder="Votre email"
                className="w-full bg-white/10 border border-light/30 rounded-lg px-4 py-3 text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <textarea
              placeholder="Votre message"
              rows={4}
              className="w-full bg-white/10 border border-light/30 rounded-lg px-4 py-3 text-light placeholder-light/50 focus:outline-none focus:border-secondary transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full bg-secondary text-primary font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105"
            >
              Envoyer le Message
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
