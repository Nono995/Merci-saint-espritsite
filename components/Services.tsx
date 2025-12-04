'use client'

import { motion } from 'framer-motion'
import { Clock, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Service {
  id: string
  day: string
  time: string
  title: string
  description: string
}

interface PageHeading {
  id: string
  title: string
  description: string
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [servicesHeading, setServicesHeading] = useState<PageHeading | null>(null)
  const [location, setLocation] = useState('123 Rue de la Foi, Ville, Pays')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*')
        .order('order_index', { ascending: true })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'services')
        .single()

      const { data: settingsData, error: settingsError } = await supabase
        .from('settings')
        .select('*')
        .eq('setting_key', 'location_address')
        .single()

      if (servicesError) throw servicesError
      if (headingError && headingError.code !== 'PGRST116') throw headingError
      if (settingsError && settingsError.code !== 'PGRST116') console.warn('Settings non trouvés')

      setServices(servicesData || [])
      setServicesHeading(headingData || null)
      if (settingsData) setLocation(settingsData.setting_value)
    } catch (err) {
      console.error('Erreur fetch services:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 section-pattern opacity-50"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                Nos Horaires
              </span>
            </div>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {servicesHeading?.title || 'Nos Services'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {servicesHeading?.description || 'Différents services pour différents besoins spirituels'}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-600">Chargement...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-16"
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Background Decoration */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-secondary/20 to-rose-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Day & Time Header */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-rose-500 rounded-2xl flex items-center justify-center shadow-medium">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{service.day}</p>
                      <p className="text-xl font-black text-gray-900">{service.time}</p>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <div className="px-3 py-1.5 bg-secondary/10 rounded-full">
                    <p className="text-xs font-bold text-secondary uppercase">Actif</p>
                  </div>
                </div>

                {/* Title */}
                <h3 className="relative z-10 font-display text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-secondary transition-colors leading-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="relative z-10 text-gray-600 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Footer */}
                <div className="relative z-10 flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-rose-500 border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-purple border-2 border-white"></div>
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple to-purple-dark border-2 border-white"></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">+50 participants</span>
                  </div>
                  
                  <a 
                    href="#contact" 
                    className="text-secondary hover:text-rose-500 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 text-center text-white overflow-hidden shadow-strong"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-secondary rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-rose-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              <span className="text-secondary font-semibold text-xs tracking-[0.2em] uppercase">
                Localisation
              </span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
              Venez Nous Rendre Visite
            </h3>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <p className="text-lg text-white/90">{location}</p>
            </div>
            <button className="bg-gradient-to-r from-secondary to-rose-500 text-white font-bold px-10 py-4 rounded-xl hover:shadow-strong transition-all duration-300 transform hover:scale-105">
              Voir sur la carte
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
