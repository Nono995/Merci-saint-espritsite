'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Edit2, X, Check } from 'lucide-react'
import { Heart, Users, BookOpen, Star, Zap, Award, Target, Smile } from 'lucide-react'

interface Feature {
  id: string
  title: string
  description: string
  icon_name: string
  order_index: number
}

const iconMap: Record<string, any> = {
  Heart,
  Users,
  BookOpen,
  Star,
  Zap,
  Award,
  Target,
  Smile,
}

const icons = Object.keys(iconMap)

export default function FeaturesManager() {
  const [features, setFeatures] = useState<Feature[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon_name: 'Heart',
    order_index: 0,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchFeatures()
  }, [])

  const fetchFeatures = async () => {
    try {
      const { data, error } = await supabase
        .from('features')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setFeatures(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      setError('Le titre est requis')
      return
    }

    try {
      const newFeature = {
        ...formData,
        order_index: features.length,
      }
      const { error } = await supabase.from('features').insert([newFeature])

      if (error) throw error
      setFormData({ title: '', description: '', icon_name: 'Heart', order_index: 0 })
      setShowForm(false)
      setSuccess('Feature ajoutée avec succès')
      setTimeout(() => setSuccess(''), 3000)
      fetchFeatures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('features')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ title: '', description: '', icon_name: 'Heart', order_index: 0 })
      setSuccess('Feature mise à jour avec succès')
      setTimeout(() => setSuccess(''), 3000)
      fetchFeatures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette feature?')) return

    try {
      const { error } = await supabase.from('features').delete().eq('id', id)

      if (error) throw error
      setSuccess('Feature supprimée')
      setTimeout(() => setSuccess(''), 3000)
      fetchFeatures()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (feature: Feature) => {
    setEditingId(feature.id)
    setFormData({
      title: feature.title,
      description: feature.description,
      icon_name: feature.icon_name,
      order_index: feature.order_index,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({ title: '', description: '', icon_name: 'Heart', order_index: 0 })
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
          Ajouter une Feature
        </button>
      )}

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? '✏️ Modifier la Feature' : '➕ Ajouter une Feature'}
          </h3>

          <form onSubmit={editingId ? handleUpdate : handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="ex: Foi Authentique"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Décrivez cette feature..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Icône
                </label>
                <select
                  value={formData.icon_name}
                  onChange={(e) => setFormData({ ...formData, icon_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {icons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon}
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
          Features ({features.length})
        </h3>

        {features.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-gray-600">Aucune feature pour le moment</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon_name] || Heart
              return (
                <div
                  key={feature.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-6 h-6 text-indigo-600" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{feature.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                          <div className="mt-3 flex gap-4 text-xs text-gray-500">
                            <span>Icône: {feature.icon_name}</span>
                            <span>Ordre: {feature.order_index}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(feature)}
                            className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors"
                            title="Éditer"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(feature.id)}
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
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
