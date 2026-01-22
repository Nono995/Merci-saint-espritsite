'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Sparkles, ArrowUpRight } from 'lucide-react'

interface Member {
  id: string
  name: string
  role: string
  image_url: string
}

interface PageHeading {
  id: string
  title: string
  description: string
  tag?: string
}

interface ContentSection {
  id: string
  title: string
  description: string
  content: string
}

export default function Community() {
  const [communityMembers, setCommunityMembers] = useState<Member[]>([])
  const [communityHeading, setCommunityHeading] = useState<PageHeading | null>(null)
  const [ctaContent, setCtaContent] = useState<ContentSection | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const { data: membersData, error: membersError } = await supabase
        .from('community_members')
        .select('*')
        .order('order_index', { ascending: true })

      const { data: headingData, error: headingError } = await supabase
        .from('page_headings')
        .select('*')
        .eq('page_name', 'community')
        .maybeSingle()

      const { data: ctaData, error: ctaError } = await supabase
        .from('content_sections')
        .select('*')
        .eq('section_name', 'community_cta')
        .maybeSingle()

      if (membersError) throw membersError
      if (headingError && headingError.code !== 'PGRST116') throw headingError
      if (ctaError && ctaError.code !== 'PGRST116') throw ctaError

      setCommunityMembers(membersData || [])
      setCommunityHeading(headingData || null)
      setCtaContent(ctaData || null)
    } catch (err) {
      console.error('Erreur fetch community:', err)
    } finally {
      setLoading(false)
    }
  }



  return (
    <section id="community" className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/10 to-rose-500/10 px-5 py-2 rounded-full mb-6">
            <Sparkles size={18} className="text-secondary" />
            <span className="font-semibold text-sm tracking-wide text-secondary">
              {communityHeading?.tag || 'Qui Sommes-Nous'}
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            {communityHeading?.title || 'Notre Communauté'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {communityHeading?.description || 'Une famille unie par la foi, l\'amour et le service'}
          </p>
        </motion.div>

        {/* Team Members Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {communityMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative"
              >
                <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-100">
                  {/* Image */}
                  <Image
                    src={member.image_url}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-[2px] bg-gradient-to-r from-secondary to-transparent" />
                        <p className="text-secondary font-semibold">
                          {member.role}
                        </p>
                      </div>
                    </div>

                    {/* Hover Details */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <button className="inline-flex items-center gap-2 text-white text-sm font-semibold hover:gap-3 transition-all">
                        En savoir plus
                        <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-12 md:p-16 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-secondary/20 to-rose-500/20 rounded-full blur-3xl" />

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                <span className="text-secondary font-semibold text-xs tracking-[0.2em] uppercase">
                  {ctaContent?.content || 'Rejoignez-Nous'}
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {ctaContent?.title || 'Rejoignez Notre Famille'}
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                {ctaContent?.description || "Faites partie d'une communauté qui grandit ensemble dans la foi"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group relative px-8 py-4 bg-white text-gray-900 font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Rejoignez-Nous
                    <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
                  </span>
                </button>
                <button className="px-8 py-4 border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300">
                  En Savoir Plus
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
