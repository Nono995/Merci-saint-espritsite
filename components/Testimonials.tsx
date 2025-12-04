'use client'

import { motion } from 'framer-motion'
import { Star, ArrowRight, Verified } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  rating: number
  image_url: string
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setTestimonials(data || [])
    } catch (err) {
      console.error('Erreur fetch testimonials:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-100 rounded w-32 mx-auto" />
            <div className="h-10 bg-gray-100 rounded w-64 mx-auto" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Minimal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-gradient-to-r from-secondary to-transparent" />
            <span className="text-secondary font-semibold text-sm tracking-[0.2em] uppercase">
              Témoignages
            </span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-[1.1]">
            Ce qu'ils disent
            <br />
            <span className="text-gray-400">de nous</span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Des vies transformées, des témoignages authentiques
          </p>
        </motion.div>

        {/* Testimonials Grid - Minimal Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative"
            >
              {/* Card */}
              <div className="relative bg-gray-50 rounded-3xl p-8 md:p-10 transition-all duration-500 hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-transparent hover:border-gray-200">
                
                {/* Rating Stars - Minimal */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center"
                    >
                      <Star size={12} className="fill-secondary text-secondary" />
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
                  {testimonial.text}
                </p>

                {/* Author - Horizontal Layout */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-4">
                    {/* Avatar with Gradient Ring */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary to-rose-500 rounded-full blur-sm opacity-50" />
                      <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white">
                        <Image
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 text-base">
                          {testimonial.name}
                        </p>
                        <Verified size={16} className="text-secondary fill-secondary" />
                      </div>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Hover Arrow */}
                  <div
                    className={`w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center transition-all duration-300 ${
                      hoveredId === testimonial.id
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2'
                    }`}
                  >
                    <ArrowRight size={18} className="text-white" />
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-gray-200 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <p className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-4 leading-tight">
              Rejoignez notre communauté et{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-secondary to-rose-500 bg-clip-text text-transparent">
                  partagez votre témoignage
                </span>
                <svg className="absolute -bottom-1 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none">
                  <path d="M2 6C40 3 80 2 120 4C160 6 180 3 198 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-secondary/30" />
                </svg>
              </span>
            </p>
            
            <button className="group relative mt-8 inline-flex items-center gap-3 bg-gradient-to-r from-secondary to-rose-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3">
                Partager mon témoignage
                <ArrowRight
                  size={22}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
