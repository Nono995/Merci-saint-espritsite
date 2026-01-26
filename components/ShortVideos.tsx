'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Share2, X, ExternalLink } from 'lucide-react'
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

interface PageHeading {
  id: string
  title: string
  description: string
  tag?: string
}

const extractYoutubeVideoId = (url: string): string | null => {
  if (!url) return null
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts|live)\/|\S*?[?&]v=)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/i
  const match = url.match(regex)
  if (match && match[1]) return match[1]
  
  // Fallback for extremely weird URLs or just the ID itself
  const idMatch = url.match(/([a-zA-Z0-9_-]{11})/)
  if (url.length === 11 && idMatch) return url
  
  return null
}

export default function ShortVideos() {
  const [videos, setVideos] = useState<ShortVideo[]>([])
  const [videosHeading, setVideosHeading] = useState<PageHeading | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedVideo, setSelectedVideo] = useState<ShortVideo | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: videosData, error: videosError } = await supabase
        .from('short_videos')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'short-videos')
        .maybeSingle()

      if (videosError) throw videosError
      if (headingError && headingError.code !== 'PGRST116') throw headingError

      setVideos(videosData || [])
      setVideosHeading(headingData || null)
    } catch (err) {
      console.error('Erreur fetch short videos:', err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  const defaultVideos: ShortVideo[] = [
    {
      id: '1',
      title: 'Mot d\'Encouragement du Jour',
      duration_seconds: 165,
      views: '2.3K',
      creator: 'Pasteur Jean',
      description: 'Un message puissant pour commencer votre journée avec foi et détermination.',
      thumbnail_url: '/images/img1.jpg',
      date: '14 Déc 2024',
      youtube_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4'
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
      youtube_url: 'https://www.youtube.com/watch?v=vVj2SpxXfNA'
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
      youtube_url: 'https://www.youtube.com/watch?v=5_G_E86-574'
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
      youtube_url: 'https://www.youtube.com/watch?v=ScMzIvxBSi4'
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
      youtube_url: 'https://www.youtube.com/watch?v=vVj2SpxXfNA'
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
      youtube_url: 'https://www.youtube.com/watch?v=5_G_E86-574'
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
                  {videosHeading?.tag || 'Inspiration Express'}
                </span>
              </div>
            </motion.div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              {videosHeading?.title || 'Vidéos Courtes'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {videosHeading?.description || 'Des moments d\'inspiration rapides pour illuminer votre journée'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 1 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {displayVideos.map((video) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 1, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => (video.youtube_url || video.video_url) && setSelectedVideo(video)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-medium hover:shadow-strong transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <div className="relative w-full sm:w-48 h-48 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={video.thumbnail_url || '/images/img1.jpg'}
                      alt={video.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/50 transition-colors"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/95 rounded-full flex items-center justify-center shadow-medium group-hover:scale-110 transition-transform duration-300">
                        <Play size={18} className="text-gray-900 ml-0.5" fill="currentColor" />
                      </div>
                    </div>

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
                        {video.title || 'Vidéo Sans Titre'}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {video.description || 'Pas de description disponible.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-secondary to-rose-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold">
                          {(video.creator || 'E').charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-gray-900 font-semibold truncate">{video.creator || 'Église'}</p>
                          <p className="text-[10px] text-gray-500">{video.views || '—'} vues • {video.date || 'Récent'}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.share?.({
                            title: video.title,
                            text: video.description,
                            url: window.location.href + '#videos'
                          }).catch(() => {
                            navigator.clipboard.writeText(window.location.href + '#videos');
                            alert('Lien copié !');
                          });
                        }}
                        className="text-gray-400 hover:text-secondary transition-colors flex-shrink-0 ml-2"
                        title="Partager"
                      >
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

      <AnimatePresence>
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-gray-950/95 backdrop-blur-xl flex items-center justify-center z-[100] p-0 sm:p-4" 
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative bg-black shadow-2xl w-full h-full sm:h-auto sm:rounded-3xl overflow-hidden flex flex-col ${
                selectedVideo.youtube_url?.includes('shorts/') 
                  ? 'sm:max-w-[400px] sm:aspect-[9/16]' 
                  : 'sm:max-w-4xl sm:aspect-video'
              }`}
            >
              {/* Bouton Fermer Flottant */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/10 hover:bg-red-500 backdrop-blur-md text-white rounded-full flex items-center justify-center z-50 transition-all border border-white/20"
              >
                <X size={24} />
              </button>

              {selectedVideo.youtube_url ? (
                (() => {
                  const videoId = extractYoutubeVideoId(selectedVideo.youtube_url);
                  if (!videoId) return (
                    <div className="flex-1 flex items-center justify-center text-white p-8 text-center bg-gray-900">
                      <div>
                        <p className="text-xl font-bold mb-2">Lien YouTube Invalide</p>
                        <p className="text-gray-400 text-sm">L'URL fournie n'est pas reconnue comme une vidéo YouTube.</p>
                      </div>
                    </div>
                  );

                  return (
                    <div className="flex-1 relative w-full h-full bg-black group/player">
                      <iframe
                        key={selectedVideo.id}
                        src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                        title={selectedVideo.title}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      
                      {/* Fallback button overlay visible on hover or if embed fails to play automatically */}
                      <div className="absolute bottom-4 left-4 z-50 opacity-0 group-hover/player:opacity-100 transition-opacity">
                        <a 
                          href={selectedVideo.youtube_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg transition-colors"
                        >
                          <ExternalLink size={16} />
                          Regarder sur YouTube
                        </a>
                      </div>
                    </div>
                  );
                })()
              ) : selectedVideo.video_url ? (
                <div className="flex-1 bg-black flex items-center justify-center">
                  <video 
                    controls 
                    autoPlay 
                    playsInline
                    className="max-w-full max-h-full"
                  >
                    <source src={selectedVideo.video_url} type="video/mp4" />
                  </video>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-white p-8 text-center bg-gray-900">
                  <div>
                    <p className="text-xl font-bold mb-2">Aucune Vidéo</p>
                    <p className="text-gray-400 text-sm">Cette entrée ne contient aucun lien YouTube ni fichier vidéo.</p>
                  </div>
                </div>
              )}

              {/* Infos Vidéo (Optionnel, masqué sur petits écrans si Short) */}
              <div className="p-6 bg-gradient-to-t from-black to-transparent text-white mt-auto hidden sm:block">
                <h3 className="text-xl font-bold mb-1">{selectedVideo.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-1">{selectedVideo.description}</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
