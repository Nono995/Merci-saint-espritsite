'use client'

import { motion } from 'framer-motion'
import { Heart, Users, BookOpen } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Feature {
  id: string
  title: string
  description: string
  icon_name: string
}

interface PageHeading {
  id: string
  title: string
  description: string
  tag?: string
}

interface MissionVisionContent {
  id: string
  title: string
  description1: string
  description2: string
  image_url: string
  stats_label1: string
  stats_value1: string
  stats_label2: string
  stats_value2: string
}

const iconMap: Record<string, any> = {
  Heart,
  Users,
  BookOpen,
}

export default function About() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [aboutHeading, setAboutHeading] = useState<PageHeading | null>(null)
  const [missionContent, setMissionContent] = useState<MissionVisionContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: featuresData, error: featuresError } = await supabase
        .from('features')
        .select('*')
        .order('order_index', { ascending: true })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'about')
        .maybeSingle()

      const { data: missionData, error: missionError } = await supabase
        .from('mission_vision_content')
        .select('*')
        .eq('section_name', 'mission')
        .maybeSingle()

      if (featuresError) throw featuresError
      if (headingError && headingError.code !== 'PGRST116') throw headingError
      if (missionError && missionError.code !== 'PGRST116') console.warn('Mission content non trouvé')

      setFeatures(featuresData || [])
      setAboutHeading(headingData || null)
      setMissionContent(missionData || null)
    } catch (err) {
      console.error('Erreur fetch about:', err)
    } finally {
      setLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden section-pattern">
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
                {aboutHeading?.tag || 'Découvrez-nous'}
              </span>
            </div>
          </motion.div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {aboutHeading?.title || 'À Propos de Nous'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {aboutHeading?.description || 'Grace & Faith est une église moderne dédiée à l\'épanouissement spirituel et communautaire'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-secondary/20 to-rose-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-strong">
              <Image
                src={missionContent?.image_url || "/images/img1.jpg"}
                alt="Église - Merci Saint-Esprit"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-gradient-to-r from-secondary to-transparent" />
              <span className="text-secondary font-semibold text-xs tracking-[0.2em] uppercase">
                Mission
              </span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {missionContent?.title || 'Notre Mission'}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {missionContent?.description1 || 'Fondée en 2019 par le Pasteur Anderson Kamdem, notre vision est de bâtir des vies et transformer des nations par la puissance du Saint-Esprit. Nous formons des disciples enracinés dans la Parole pour impacter chaque sphère de la société.'}
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              {missionContent?.description2 || 'Animés par l\'excellence et la consécration, nous avançons avec foi pour un impact durable sur notre génération.'}
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex-1 bg-gradient-to-br from-secondary/10 to-rose-500/10 p-4 rounded-xl border border-secondary/20">
                <p className="text-3xl font-bold text-gray-900">{missionContent?.stats_value1 || '500+'}</p>
                <p className="text-sm text-gray-600">{missionContent?.stats_label1 || 'Membres actifs'}</p>
              </div>
              <div className="flex-1 bg-gradient-to-br from-accent/10 to-purple/10 p-4 rounded-xl border border-accent/20">
                <p className="text-3xl font-bold text-gray-900">{missionContent?.stats_value2 || '15+'}</p>
                <p className="text-sm text-gray-600">{missionContent?.stats_label2 || 'Années d\'expérience'}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Chargement...</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const Icon = iconMap[feature.icon_name] || Heart
              const gradients = [
                'from-secondary/10 to-rose-500/10 border-secondary/30',
                'from-accent/10 to-purple/10 border-accent/30',
                'from-purple/10 to-purple-dark/10 border-purple/30'
              ]
              return (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group bg-gradient-to-br ${gradients[index % 3]} p-8 rounded-2xl shadow-soft hover:shadow-strong transition-all duration-300 border`}
                >
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-secondary" />
                  </div>
                  <h4 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-tight">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
