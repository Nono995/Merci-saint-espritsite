'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Plus, Trash2, Edit2, X, Check, MessageSquare, Star } from 'lucide-react'

interface Testimonial {
  id: string
  name: string
  role: string
  text: string
  rating: number
  image_url: string
  order_index: number
}

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    image_url: '',
    order_index: 0,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

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
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      setError('Le nom et le témoignage sont requis')
      return
    }

    try {
      const newTestimonial = {
        ...formData,
        order_index: testimonials.length,
      }
      const { error } = await supabase.from('testimonials').insert([newTestimonial])

      if (error) throw error
      setFormData({
        name: '',
        role: '',
        text: '',
        rating: 5,
        image_url: '',
        order_index: 0,
      })
      setShowForm(false)
      setSuccess('Témoignage ajouté avec succès')
      setTimeout(() => setSuccess(''), 3000)
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({
        name: '',
        role: '',
        text: '',
        rating: 5,
        image_url: '',
        order_index: 0,
      })
      setShowForm(false)
      setSuccess('Témoignage mis à jour avec succès')
      setTimeout(() => setSuccess(''), 3000)
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage?')) return

    try {
      const { error } = await supabase.from('testimonials').delete().eq('id', id)

      if (error) throw error
      setSuccess('Témoignage supprimé')
      setTimeout(() => setSuccess(''), 3000)
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (testimonial: Testimonial) => {
    setEditingId(testimonial.id)
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      rating: testimonial.rating,
      image_url: testimonial.image_url,
      order_index: testimonial.order_index,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({
      name: '',
      role: '',
      text: '',
      rating: 5,
      image_url: '',
      order_index: 0,
    })
    setShowForm(false)
    setError('')
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <span className="text-lg">⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-auto">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          <Check size={18} />
          <span>{success}</span>
        </div>
      )}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <Plus size={20} />
          Ajouter un Témoignage
        </button>
      )}

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? '✏️ Modifier le Témoignage' : '➕ Ajouter un Témoignage'}
          </h3>

          <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ex: Jean Dupont"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rôle
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ex: Membre depuis 3 ans"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Témoignage *
              </label>
              <textarea
                value={formData.text}
                onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Partagez votre témoignage..."
                rows={4}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL de la Photo
              </label>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="ex: /images/img1.jpg"
              />
              {formData.image_url && (
                <div className="mt-3 relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                  <Image
                    src={formData.image_url}
                    alt="Aperçu"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Note (étoiles)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {[1, 2, 3, 4, 5].map((r) => (
                    <option key={r} value={r}>
                      {'⭐'.repeat(r)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <Check size={18} />
                {editingId ? 'Mettre à jour' : 'Ajouter'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <X size={18} />
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Témoignages ({testimonials.length})
        </h3>

        {testimonials.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-600">Aucun témoignage pour le moment</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {testimonial.image_url && (
                    <div className="flex-shrink-0">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                        <Image
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                        {testimonial.role && (
                          <p className="text-sm text-gray-600 mb-2">{testimonial.role}</p>
                        )}
                        <p className="text-sm text-gray-700 italic mb-3">"{testimonial.text}"</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{'⭐'.repeat(testimonial.rating)}</span>
                          <span className="text-xs text-gray-500">Ordre: {testimonial.order_index}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => startEdit(testimonial)}
                          className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                          title="Éditer"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(testimonial.id)}
                          className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
