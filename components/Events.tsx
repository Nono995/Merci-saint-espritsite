'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Event {
  id: string
  date: string
  title: string
  description: string
  attendees: string
  image_url: string
}

interface PageHeading {
  id: string
  title: string
  description: string
  tag?: string
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [eventsHeading, setEventsHeading] = useState<PageHeading | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'events')
        .maybeSingle()

      if (eventsError) throw eventsError
      if (headingError && headingError.code !== 'PGRST116') throw headingError

      setEvents(eventsData || [])
      setEventsHeading(headingData || null)
    } catch (err) {
      console.error('Erreur fetch events:', err instanceof Error ? err.message : JSON.stringify(err))
    } finally {
      setLoading(false)
    }
  }

  const defaultEvents = [
    {
      date: '15 Décembre',
      title: 'Célébration de Noël',
      description: 'Une célébration spéciale de la naissance du Christ avec musique et festif',
      attendees: '500+',
      image_url: '/images/img1.jpg',
    },
    {
      date: '22 Décembre',
      title: 'Concert de Chants Sacrés',
      description: 'Soirée musicale inspirante avec l\'orchestre de notre église',
      attendees: '300+',
      image_url: '/images/img2.jpg',
    },
    {
      date: '5 Janvier',
      title: 'Retraite Spirituelle',
      description: 'Weekend de méditation et de croissance spirituelle en montagne',
      attendees: '150+',
      image_url: '/images/img3.jpg',
    },
    {
      date: '20 Janvier',
      title: 'Conférence Jeunesse',
      description: 'Rencontre des jeunes avec des orateurs inspirants',
      attendees: '200+',
      image_url: '/images/img1.jpg',
    },
  ]

  const displayEvents = events.length > 0 ? events : defaultEvents

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="events" className="py-20 bg-gradient-to-br from-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full border border-white/20">
              <span className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary font-semibold text-sm tracking-[0.2em] uppercase">
                {eventsHeading?.tag || 'Agenda'}
              </span>
            </div>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-light mb-6 leading-tight">
            {eventsHeading?.title || 'Événements à Venir'}
          </h2>
          <p className="text-xl text-light/90 max-w-3xl mx-auto leading-relaxed">
            {eventsHeading?.description || 'Découvrez nos événements spéciaux et marquez votre calendrier'}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {displayEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="group bg-white/10 backdrop-blur-md border border-secondary/30 rounded-2xl overflow-hidden hover:border-secondary/60 transition-all duration-300 cursor-pointer"
            >
              <div className="flex md:flex-row flex-col h-full">
                <div className="relative w-full md:w-48 h-40 sm:h-48 md:h-auto overflow-hidden group-hover:brightness-75 transition-all duration-300">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <span className="text-secondary font-semibold">{event.date}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-light mb-3 leading-tight">
                  {event.title}
                </h3>
                    <p className="text-light/70 mb-4">{event.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-secondary" />
                      <span className="text-light/60">{event.attendees}</span>
                    </div>
                    <a href="#contact" className="bg-secondary text-primary font-bold px-6 py-2 rounded-lg hover:bg-secondary/90 transition-all duration-300 transform group-hover:scale-105 inline-block">
                      S'inscrire
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <a href="#events" className="border-2 border-secondary text-secondary font-bold px-8 py-4 rounded-lg hover:bg-secondary hover:text-primary transition-all duration-300 inline-block">
            Voir tous les événements
          </a>
        </motion.div>
      </div>
    </section>
  )
}
