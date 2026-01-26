'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, Volume2, User, RotateCcw, RotateCw, FastForward, Download, VolumeX, X, Calendar, Share2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Podcast {
  id: string
  title: string
  description: string
  audio_url: string
  episode: string
  speaker: string
  image_url: string
  duration_seconds: number
  date: string
}

interface PageHeading {
  id: string
  title: string
  description: string
  tag?: string
}

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [podcastsHeading, setPodcastsHeading] = useState<PageHeading | null>(null)
  const [loading, setLoading] = useState(true)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState<Record<string, number>>({})
  const [duration, setDuration] = useState<Record<string, number>>({})
  const [volume, setVolume] = useState<Record<string, number>>({})
  const [playbackRate, setPlaybackRate] = useState<Record<string, number>>({})
  const [showVolume, setShowVolume] = useState<string | null>(null)
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: podcastsData, error: podcastsError } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'podcasts')
        .maybeSingle()

      if (podcastsError) throw podcastsError
      if (headingError && headingError.code !== 'PGRST116') throw headingError

      setPodcasts(podcastsData || [])
      setPodcastsHeading(headingData || null)
      
      // Initialize states for each podcast
      const initialVolume: Record<string, number> = {}
      const initialRate: Record<string, number> = {}
      const data = podcastsData || []
      data.forEach(p => {
        initialVolume[p.id] = 1
        initialRate[p.id] = 1
      })
      setVolume(initialVolume)
      setPlaybackRate(initialRate)
    } catch (err) {
      console.error('Erreur fetch podcasts:', err)
    } finally {
      setLoading(false)
    }
  }

  const togglePlay = (id: string) => {
    const audio = audioRefs.current[id]
    if (!audio) return

    if (playingId === id) {
      audio.pause()
      setPlayingId(null)
    } else {
      // Pause all other audios
      Object.entries(audioRefs.current).forEach(([pid, a]) => {
        if (pid !== id && a) a.pause()
      })
      
      audio.play()
      setPlayingId(id)
    }
  }

  const handleLoadedMetadata = (id: string) => {
    const audio = audioRefs.current[id]
    if (audio) {
      setDuration(prev => ({ ...prev, [id]: audio.duration }))
    }
  }

  const handleTimeUpdate = (id: string) => {
    const audio = audioRefs.current[id]
    if (audio) {
      setCurrentTime(prev => ({ ...prev, [id]: audio.currentTime }))
    }
  }

  const handleSeek = (id: string, value: number) => {
    const audio = audioRefs.current[id]
    if (audio) {
      audio.currentTime = value
      setCurrentTime(prev => ({ ...prev, [id]: value }))
    }
  }

  const skip = (id: string, amount: number) => {
    const audio = audioRefs.current[id]
    if (audio) {
      audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + amount))
    }
  }

  const handleVolumeChange = (id: string, value: number) => {
    const audio = audioRefs.current[id]
    if (audio) {
      audio.volume = value
      setVolume(prev => ({ ...prev, [id]: value }))
    }
  }

  const handleRateChange = (id: string) => {
    const audio = audioRefs.current[id]
    if (audio) {
      const rates = [1, 1.25, 1.5, 2]
      const currentRate = playbackRate[id] || 1
      const nextRate = rates[(rates.indexOf(currentRate) + 1) % rates.length]
      audio.playbackRate = nextRate
      setPlaybackRate(prev => ({ ...prev, [id]: nextRate }))
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

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

  if (loading) return null

  const defaultPodcasts: Podcast[] = [
    {
      id: 'default-1',
      title: 'La Puissance de la Foi',
      description: 'Un message inspirant sur la manière dont la foi peut déplacer des montagnes dans votre vie quotidienne.',
      audio_url: '#',
      episode: 'Épisode 01',
      speaker: 'Pasteur Anderson Kamdem',
      image_url: '/images/img1.jpg',
      duration_seconds: 1800,
      date: '20 Janvier 2025'
    },
    {
      id: 'default-2',
      title: 'Marcher avec le Saint-Esprit',
      description: 'Découvrez comment cultiver une relation intime et quotidienne avec le Saint-Esprit.',
      audio_url: '#',
      episode: 'Épisode 02',
      speaker: 'Pasteur Anderson Kamdem',
      image_url: '/images/img2.jpg',
      duration_seconds: 2100,
      date: '15 Janvier 2025'
    }
  ]

  const displayPodcasts = podcasts.length > 0 ? podcasts : defaultPodcasts

  return (
    <section id="podcasts" className="py-24 bg-white relative overflow-hidden section-pattern">
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
                {podcastsHeading?.tag || 'Écoutez & Inspirez-vous'}
              </span>
            </div>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {podcastsHeading?.title || 'Podcasts & Audio'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {podcastsHeading?.description || 'Des messages inspirants à emporter partout avec vous'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {displayPodcasts.map((podcast) => (
            <motion.div
              key={podcast.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-secondary/20 to-rose-500/20">
                  <Image
                    src={podcast.image_url || '/images/img1.jpg'}
                    alt={podcast.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                  
                  {/* Audio Wave Icon */}
                  <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <svg className={`w-4 h-4 ${playingId === podcast.id ? 'text-white' : 'text-white/50'}`} viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="8" width="2" height="8" rx="1">
                        {playingId === podcast.id && <animate attributeName="height" values="8;16;8" dur="1s" repeatCount="indefinite" />}
                        {playingId === podcast.id && <animate attributeName="y" values="8;4;8" dur="1s" repeatCount="indefinite" />}
                      </rect>
                      <rect x="6" y="6" width="2" height="12" rx="1">
                        {playingId === podcast.id && <animate attributeName="height" values="12;20;12" dur="1s" begin="0.2s" repeatCount="indefinite" />}
                        {playingId === podcast.id && <animate attributeName="y" values="6;2;6" dur="1s" begin="0.2s" repeatCount="indefinite" />}
                      </rect>
                      <rect x="10" y="4" width="2" height="16" rx="1">
                        {playingId === podcast.id && <animate attributeName="height" values="16;22;16" dur="1s" begin="0.4s" repeatCount="indefinite" />}
                        {playingId === podcast.id && <animate attributeName="y" values="4;1;4" dur="1s" begin="0.4s" repeatCount="indefinite" />}
                      </rect>
                      <rect x="14" y="6" width="2" height="12" rx="1">
                        {playingId === podcast.id && <animate attributeName="height" values="12;18;12" dur="1s" begin="0.6s" repeatCount="indefinite" />}
                        {playingId === podcast.id && <animate attributeName="y" values="6;3;6" dur="1s" begin="0.6s" repeatCount="indefinite" />}
                      </rect>
                      <rect x="18" y="8" width="2" height="8" rx="1">
                        {playingId === podcast.id && <animate attributeName="height" values="8;14;8" dur="1s" begin="0.8s" repeatCount="indefinite" />}
                        {playingId === podcast.id && <animate attributeName="y" values="8;5;8" dur="1s" begin="0.8s" repeatCount="indefinite" />}
                      </rect>
                    </svg>
                    AUDIO
                  </div>

                  <div className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {formatTime(podcast.duration_seconds)}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">
                          {podcast.episode}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} className="text-secondary/60" />
                          <span>{podcast.date}</span>
                        </div>
                      </div>
                        <div className="flex items-center gap-1">
                          <button 
                            onClick={() => {
                              navigator.share?.({
                                title: podcast.title,
                                text: podcast.description,
                                url: window.location.href + '#podcasts'
                              }).catch(() => {
                                navigator.clipboard.writeText(window.location.href + '#podcasts');
                                alert('Lien copié !');
                              });
                            }}
                            className="p-2 text-gray-400 hover:text-secondary transition-colors"
                            title="Partager"
                          >
                            <Share2 size={18} />
                          </button>
                          <a 
                            href={podcast.audio_url} 
                            download 
                            className="p-2 text-gray-400 hover:text-secondary transition-colors"
                            title="Télécharger"
                          >
                            <Download size={18} />
                          </a>
                        </div>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                      {podcast.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base line-clamp-2">
                      {podcast.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <User size={16} className="text-secondary" />
                      <span className="font-medium">{podcast.speaker}</span>
                    </div>
                  </div>

                  {/* Audio Player */}
                  <div className="bg-gray-50/50 rounded-xl p-3 md:p-4 space-y-3 border border-gray-100/50">
                    <audio
                      ref={(el) => { audioRefs.current[podcast.id] = el }}
                      src={podcast.audio_url}
                      onLoadedMetadata={() => handleLoadedMetadata(podcast.id)}
                      onTimeUpdate={() => handleTimeUpdate(podcast.id)}
                      onEnded={() => setPlayingId(null)}
                      preload="metadata"
                    />
                    
                    <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => skip(podcast.id, -15)}
                          className="p-1.5 text-gray-400 hover:text-secondary transition-colors"
                        >
                          <RotateCcw size={16} />
                        </button>
                        
                        <button
                          onClick={() => togglePlay(podcast.id)}
                          className="w-10 h-10 bg-gradient-to-r from-secondary to-rose-500 rounded-full flex items-center justify-center text-white hover:shadow-strong transition-all duration-300 transform hover:scale-105 shadow-sm"
                        >
                          {playingId === podcast.id ? (
                            <Pause size={18} fill="currentColor" />
                          ) : (
                            <Play size={18} className="ml-1" fill="currentColor" />
                          )}
                        </button>

                        <button 
                          onClick={() => skip(podcast.id, 15)}
                          className="p-1.5 text-gray-400 hover:text-secondary transition-colors"
                        >
                          <RotateCw size={16} />
                        </button>
                      </div>

                      <div className="flex-1 w-full space-y-1">
                        <input
                          type="range"
                          min="0"
                          max={duration[podcast.id] || podcast.duration_seconds || 100}
                          value={currentTime[podcast.id] || 0}
                          onChange={(e) => handleSeek(podcast.id, Number(e.target.value))}
                          className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-secondary transition-all hover:h-1.5"
                        />
                        <div className="flex justify-between text-[10px] font-semibold text-gray-400">
                          <span>{formatTime(currentTime[podcast.id] || 0)}</span>
                          <span>{formatTime(duration[podcast.id] || podcast.duration_seconds)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleRateChange(podcast.id)}
                          className="text-[10px] font-bold text-gray-500 hover:text-secondary w-9 py-1 bg-white border border-gray-200 rounded-md shadow-sm transition-colors"
                        >
                          {playbackRate[podcast.id] || 1}x
                        </button>

                        <div 
                          className="relative flex items-center gap-1"
                          onMouseEnter={() => setShowVolume(podcast.id)}
                          onMouseLeave={() => setShowVolume(null)}
                        >
                          <button 
                            className="p-1.5 text-gray-400 hover:text-secondary transition-colors"
                            onClick={() => handleVolumeChange(podcast.id, volume[podcast.id] === 0 ? 1 : 0)}
                          >
                            {(volume[podcast.id] || 1) === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                          </button>
                          
                          <AnimatePresence>
                            {showVolume === podcast.id && (
                              <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 60 }}
                                exit={{ opacity: 0, width: 0 }}
                                className="overflow-hidden flex items-center"
                              >
                                <input
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.01"
                                  value={volume[podcast.id] ?? 1}
                                  onChange={(e) => handleVolumeChange(podcast.id, parseFloat(e.target.value))}
                                  className="w-16 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer accent-secondary"
                                />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  )
}
