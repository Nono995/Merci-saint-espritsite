'use client'

import { motion } from 'framer-motion'
import { Play, Heart, Share2, MoreVertical } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function ShortVideos() {
  const [likes, setLikes] = useState<Record<number, number>>({})

  const videos = [
    {
      id: 1,
      title: 'Mot d\'Encouragement',
      duration: '0:45',
      views: '2.3K',
      creator: 'Pasteur Jean',
      imageUrl: '/images/img1.jpg',
      placeholder: '💪',
      color: 'from-red-500 to-red-600',
    },
    {
      id: 2,
      title: 'Verset du Jour',
      duration: '1:12',
      views: '5.1K',
      creator: 'Communauté',
      imageUrl: '/images/img2.jpg',
      placeholder: '📖',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 3,
      title: 'Témoignage Express',
      duration: '0:58',
      views: '3.8K',
      creator: 'Marie Dupont',
      imageUrl: '/images/img3.jpg',
      placeholder: '⭐',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      id: 4,
      title: 'Prière Rapide',
      duration: '1:30',
      views: '4.2K',
      creator: 'Sophie Bernard',
      imageUrl: '/images/img1.jpg',
      placeholder: '🙏',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 5,
      title: 'Conseil du Dimanche',
      duration: '0:52',
      views: '2.9K',
      creator: 'Leadership',
      imageUrl: '/images/img2.jpg',
      placeholder: '💡',
      color: 'from-cyan-500 to-cyan-600',
    },
    {
      id: 6,
      title: 'Citation Inspirante',
      duration: '0:35',
      views: '6.2K',
      creator: 'Inspiration Daily',
      imageUrl: '/images/img3.jpg',
      placeholder: '✨',
      color: 'from-pink-500 to-pink-600',
    },
  ]

  const toggleLike = (id: number) => {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 1 ? 0 : 1,
    }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="videos" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-primary mb-4">Short Videos</h2>
          <div className="w-24 h-1 bg-rose-500 mx-auto mb-6" />
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Des contenus courts et impactants pour votre inspiration quotidienne
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-primary/5"
            >
              <div className={`bg-gradient-to-br ${video.color} aspect-video flex items-center justify-center relative overflow-hidden group-hover:brightness-90 transition-all duration-300`}>
                <div className="text-7xl">{video.placeholder}</div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button className="bg-rose-500 text-white p-4 rounded-full hover:bg-rose-600 transform scale-75 group-hover:scale-100 transition-all duration-300">
                    <Play size={32} fill="white" />
                  </button>
                </div>

                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {video.duration}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-primary line-clamp-2 mb-1">{video.title}</h3>
                    <p className="text-xs text-primary/70 font-medium">{video.creator}</p>
                  </div>
                  <button className="text-primary/40 hover:text-primary p-1">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <p className="text-sm text-primary/70 mb-4">👁️ {video.views} vues</p>

                <div className="flex gap-3 pt-4 border-t border-primary/10">
                  <button
                    onClick={() => toggleLike(video.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold transition-all duration-300 ${
                      likes[video.id] === 1
                        ? 'bg-rose-500/20 text-rose-500'
                        : 'bg-primary/10 text-primary hover:bg-primary/20'
                    }`}
                  >
                    <Heart size={20} fill={likes[video.id] === 1 ? 'currentColor' : 'none'} />
                    <span className="text-sm">J'aime</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                    <Share2 size={20} />
                    <span className="text-sm">Partager</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
