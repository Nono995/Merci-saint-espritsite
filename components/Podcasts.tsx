'use client'

import { motion } from 'framer-motion'
import { Play, Clock, User } from 'lucide-react'

export default function Podcasts() {
  const podcasts = [
    {
      id: 1,
      title: 'La Foi en Action',
      episode: 'Épisode 12',
      duration: '32:45',
      speaker: 'Pasteur Jean',
      description: 'Découvrez comment vivre sa foi au quotidien',
      imageUrl: '/images/img1.jpg',
      placeholder: '🎙️',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 2,
      title: 'Paroles de Vie',
      episode: 'Épisode 8',
      duration: '28:12',
      speaker: 'Marie Dupont',
      description: 'Méditations inspirantes pour votre journée',
      imageUrl: '/images/img2.jpg',
      placeholder: '🎧',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 3,
      title: 'Questions de Jeunesse',
      episode: 'Épisode 15',
      duration: '35:30',
      speaker: 'Sophie Bernard',
      description: 'Réponses aux questions spirituelles des jeunes',
      imageUrl: '/images/img3.jpg',
      placeholder: '💬',
      color: 'from-pink-500 to-pink-600',
    },
    {
      id: 4,
      title: 'Prières du Matin',
      episode: 'Série Daily',
      duration: '7:00',
      speaker: 'Communauté',
      description: 'Prière inspirante pour bien commencer votre jour',
      imageUrl: '/images/img1.jpg',
      placeholder: '🌅',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="podcasts" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-4">Podcasts & Audio</h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto mb-6" />
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Écoutez nos messages inspirants n'importe où, n'importe quand
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {podcasts.map((podcast) => (
            <motion.div
              key={podcast.id}
              variants={itemVariants}
              whileHover={{ y: -15 }}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`bg-gradient-to-br ${podcast.color} h-48 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-7xl opacity-80">{podcast.placeholder}</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <button className="bg-white text-primary w-14 h-14 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-rose-500 hover:text-white">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                <div className="mb-3">
                  <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                    {podcast.episode}
                  </span>
                  <h3 className="text-lg font-bold text-primary mt-2 line-clamp-2">
                    {podcast.title}
                  </h3>
                </div>

                <p className="text-sm text-primary/70 mb-4 line-clamp-2">
                  {podcast.description}
                </p>

                <div className="space-y-2 border-t border-primary/10 pt-4">
                  <div className="flex items-center gap-2 text-sm text-primary/80">
                    <User size={16} className="text-rose-500" />
                    <span>{podcast.speaker}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary/80">
                    <Clock size={16} className="text-rose-500" />
                    <span>{podcast.duration}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-rose-500/10 text-rose-500 font-semibold py-2 rounded-lg hover:bg-rose-500 hover:text-white transition-all duration-300">
                  Écouter
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>


      </div>
    </section>
  )
}
