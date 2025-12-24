'use client'

import { motion } from 'framer-motion'
import { Play, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ShortVideo {
  id: string
  title: string
  duration_seconds: number
  views?: string
  creator: string
  description: string
  thumbnail_url: string
  date?: string
  video_url?: string
  youtube_url?: string
}

const extractYoutubeVideoId = (url: string): string | null => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/
  const match = url.match(regex)
  return match ? match[1] : null
}

export default function ShortVideos() {
  const [videos, setVideos] = useState<ShortVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<ShortVideo | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('short_videos')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setVideos(data || [])
    } catch (err) {
      console.error('Erreur fetch short videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const defaultVideos = [
    {
      id: '1',
      title: 'Mot d\'Encouragement du Jour',
      duration_seconds: 165,
      views: '2.3K',
      creator: 'Pasteur Jean',
      description: 'Un message puissant pour commencer votre journée avec foi et détermination.',
      thumbnail_url: '/images/img1.jpg',
      date: '14 Déc 2024',
    },
    {
      id: '2',
      title: 'Verset du Jour Expliqué',
      duration_seconds: 192,
      views: '5.1K',
      creator: 'Communauté',
      description: 'Découvrez la signification profonde du verset biblique du jour.',
      thumbnail_url: '/images/img2.jpg',
      date: '13 Déc 2024',
    },
    {
      id: '3',
      title: 'Témoignage Inspirant',
      duration_seconds: 298,
      views: '3.8K',
      creator: 'Marie Dupont',
      description: 'Comment la foi a transformé ma vie - un témoignage authentique.',
      thumbnail_url: '/images/img3.jpg',
      date: '12 Déc 2024',
    },
    {
      id: '4',
      title: 'Prière Guidée',
      duration_seconds: 330,
      views: '4.2K',
      creator: 'Sophie Bernard',
      description: 'Une prière guidée pour trouver la paix intérieure et la sérénité.',
      thumbnail_url: '/images/img1.jpg',
      date: '11 Déc 2024',
    },
    {
      id: '5',
      title: 'Enseignement Biblique',
      duration_seconds: 412,
      views: '2.9K',
      creator: 'Leadership',
      description: 'Comprendre les principes bibliques pour une vie épanouie.',
      thumbnail_url: '/images/img2.jpg',
      date: '10 Déc 2024',
    },
    {
      id: '6',
      title: 'Moment de Réflexion',
      duration_seconds: 215,
      views: '6.2K',
      creator: 'Équipe Pastorale',
      description: 'Prenez un moment pour réfléchir sur votre parcours spirituel.',
      thumbnail_url: '/images/img3.jpg',
      date: '9 Déc 2024',
    },
  ]

  const displayVideos = videos.length > 0 ? videos : defaultVideos

  const formatDuration = (seconds: number | undefined): string => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
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
    <>
      <section id="videos" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden section-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 px-5 py-2 rounded-full">
                <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                <span className="text-secondary font-semibold text-sm tracking-[0.2em] uppercase">
                  Inspiration Express
                </span>
              </div>
            </motion.div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Vidéos Courtes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Des moments d'inspiration rapides pour illuminer votre journée
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {displayVideos.map((video) => (
              <motion.div
                key={video.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                onClick={() => (video.youtube_url || video.video_url) && setSelectedVideo(video)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={video.thumbnail_url}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/50 transition-colors"></div>

                    <button className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                        <Play size={18} className="text-gray-900 ml-0.5" fill="currentColor" />
                      </div>
                    </button>

                    <div className="absolute bottom-2 right-2 bg-gray-900/90 text-white px-2 py-1 rounded text-[10px] font-bold">
                      {formatDuration(video.duration_seconds)}
                    </div>

                    {video.youtube_url && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                        🎥 YouTube
                      </div>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 mb-1.5 line-clamp-2 leading-tight group-hover:text-secondary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {video.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-secondary to-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          {video.creator.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-900 font-semibold truncate">{video.creator}</p>
                          <p className="text-[10px] text-gray-500">{video.views || '—'} vues • {video.date || 'Récent'}</p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-secondary transition-colors flex-shrink-0 ml-2">
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <button className="bg-gradient-to-r from-secondary to-rose-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-strong transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
              Voir Toutes les Vidéos
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={() => setSelectedVideo(null)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-black rounded-2xl overflow-hidden w-full max-w-2xl"
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 text-white hover:text-red-500 z-10"
            >
              ✕
            </button>

            {selectedVideo.youtube_url ? (
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                    selectedVideo.youtube_url
                  )}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <video controls autoPlay className="w-full aspect-video bg-black">
                <source src={selectedVideo.video_url} type="video/mp4" />
              </video>
            )}

            <div className="p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{selectedVideo.title}</h3>
              <p className="text-gray-300 mb-4">{selectedVideo.description}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>👤 {selectedVideo.creator}</span>
                <span>⏱️ {formatDuration(selectedVideo.duration_seconds)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
