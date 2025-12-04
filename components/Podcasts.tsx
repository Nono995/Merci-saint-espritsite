'use client'

import { motion } from 'framer-motion'
import { Play, Pause, Volume2, User } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef } from 'react'

export default function Podcasts() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [currentTime, setCurrentTime] = useState<Record<number, number>>({})
  const audioRefs = useRef<Record<number, HTMLAudioElement | null>>({})

  const podcasts = [
    {
      id: 1,
      title: 'La Foi en Action',
      episode: 'Épisode 12',
      duration: '32:45',
      speaker: 'Pasteur Jean',
      description: 'Découvrez comment vivre sa foi au quotidien avec des exemples concrets et des enseignements pratiques.',
      imageUrl: '/images/img1.jpg',
      date: '15 Déc 2024',
      audioUrl: '/audio/sample.mp3',
    },
    {
      id: 2,
      title: 'Paroles de Vie',
      episode: 'Épisode 8',
      duration: '28:12',
      speaker: 'Marie Dupont',
      description: 'Méditations inspirantes pour votre journée, basées sur les Écritures et la prière.',
      imageUrl: '/images/img2.jpg',
      date: '10 Déc 2024',
      audioUrl: '/audio/sample.mp3',
    },
    {
      id: 3,
      title: 'Questions de Jeunesse',
      episode: 'Épisode 15',
      duration: '35:30',
      speaker: 'Sophie Bernard',
      description: 'Réponses aux questions spirituelles des jeunes dans un format accessible et moderne.',
      imageUrl: '/images/img3.jpg',
      date: '5 Déc 2024',
      audioUrl: '/audio/sample.mp3',
    },
  ]

  const togglePlay = (id: number) => {
    const audio = audioRefs.current[id]
    if (!audio) return

    if (playingId === id) {
      audio.pause()
      setPlayingId(null)
    } else {
      Object.values(audioRefs.current).forEach(a => a?.pause())
      audio.play()
      setPlayingId(id)
    }
  }

  const handleTimeUpdate = (id: number) => {
    const audio = audioRefs.current[id]
    if (audio) {
      setCurrentTime(prev => ({ ...prev, [id]: audio.currentTime }))
    }
  }

  const handleSeek = (id: number, value: number) => {
    const audio = audioRefs.current[id]
    if (audio) {
      audio.currentTime = value
      setCurrentTime(prev => ({ ...prev, [id]: value }))
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const parseDuration = (duration: string) => {
    const [mins, secs] = duration.split(':').map(Number)
    return mins * 60 + secs
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
                Écoutez & Inspirez-vous
              </span>
            </div>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Podcasts & Audio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Des messages inspirants à emporter partout avec vous
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {podcasts.map((podcast) => (
            <motion.div
              key={podcast.id}
              variants={itemVariants}
              className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100"
            >
              <div className="flex flex-col md:flex-row gap-6 p-6">
                <div className="relative w-full md:w-48 h-48 flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-secondary/20 to-rose-500/20">
                  <Image
                    src={podcast.imageUrl}
                    alt={podcast.title}
                    fill
                    className="object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                  
                  {/* Audio Wave Icon */}
                  <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="8" width="2" height="8" rx="1">
                        <animate attributeName="height" values="8;16;8" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="y" values="8;4;8" dur="1s" repeatCount="indefinite" />
                      </rect>
                      <rect x="6" y="6" width="2" height="12" rx="1">
                        <animate attributeName="height" values="12;20;12" dur="1s" begin="0.2s" repeatCount="indefinite" />
                        <animate attributeName="y" values="6;2;6" dur="1s" begin="0.2s" repeatCount="indefinite" />
                      </rect>
                      <rect x="10" y="4" width="2" height="16" rx="1">
                        <animate attributeName="height" values="16;22;16" dur="1s" begin="0.4s" repeatCount="indefinite" />
                        <animate attributeName="y" values="4;1;4" dur="1s" begin="0.4s" repeatCount="indefinite" />
                      </rect>
                      <rect x="14" y="6" width="2" height="12" rx="1">
                        <animate attributeName="height" values="12;18;12" dur="1s" begin="0.6s" repeatCount="indefinite" />
                        <animate attributeName="y" values="6;3;6" dur="1s" begin="0.6s" repeatCount="indefinite" />
                      </rect>
                      <rect x="18" y="8" width="2" height="8" rx="1">
                        <animate attributeName="height" values="8;14;8" dur="1s" begin="0.8s" repeatCount="indefinite" />
                        <animate attributeName="y" values="8;5;8" dur="1s" begin="0.8s" repeatCount="indefinite" />
                      </rect>
                    </svg>
                    AUDIO
                  </div>

                  <div className="absolute bottom-3 right-3 bg-gray-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {podcast.duration}
                  </div>
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider bg-secondary/10 px-3 py-1 rounded-full">
                        {podcast.episode}
                      </span>
                      <span className="text-xs text-gray-500">{podcast.date}</span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
                      {podcast.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
                      {podcast.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                      <User size={16} className="text-secondary" />
                      <span className="font-medium">{podcast.speaker}</span>
                    </div>
                  </div>

                  {/* Audio Player */}
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <audio
                      ref={(el) => { audioRefs.current[podcast.id] = el }}
                      src={podcast.audioUrl}
                      onTimeUpdate={() => handleTimeUpdate(podcast.id)}
                      onEnded={() => setPlayingId(null)}
                    />
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => togglePlay(podcast.id)}
                        className="w-10 h-10 bg-gradient-to-r from-secondary to-rose-500 rounded-full flex items-center justify-center text-white hover:shadow-strong transition-all duration-300 flex-shrink-0"
                      >
                        {playingId === podcast.id ? (
                          <Pause size={18} fill="currentColor" />
                        ) : (
                          <Play size={18} className="ml-0.5" fill="currentColor" />
                        )}
                      </button>

                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max={parseDuration(podcast.duration)}
                          value={currentTime[podcast.id] || 0}
                          onChange={(e) => handleSeek(podcast.id, Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-secondary [&::-webkit-slider-thumb]:to-rose-500 [&::-webkit-slider-thumb]:cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>{formatTime(currentTime[podcast.id] || 0)}</span>
                          <span>{podcast.duration}</span>
                        </div>
                      </div>

                      <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors flex-shrink-0">
                        <Volume2 size={18} />
                      </button>
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
