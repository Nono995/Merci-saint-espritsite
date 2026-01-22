'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, X, Check, Zap, Save } from 'lucide-react'

interface MissionVisionContent {
  id: string
  section_name: string
  title: string
  description1: string
  description2: string
  image_url: string
  stats_label1: string
  stats_value1: string
  stats_label2: string
  stats_value2: string
}

export default function MissionVisionManager() {
  const [content, setContent] = useState<MissionVisionContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState<Partial<MissionVisionContent>>({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('mission_vision_content')
        .select('*')
        .eq('section_name', 'mission')
        .maybeSingle()

      if (error && error.code !== 'PGRST116') throw error
      if (data) {
        setContent(data)
        setFormData(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content) return

    try {
      const { error } = await supabase
        .from('mission_vision_content')
        .update(formData)
        .eq('id', content.id)

      if (error) throw error
      setSuccess('Contenu mis à jour avec succès!')
      setTimeout(() => setSuccess(''), 3000)
      setEditing(false)
      fetchContent()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de mise à jour')
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  }

  if (!content) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
        <p className="text-gray-600 mb-4">Aucun contenu mission trouvé</p>
        <p className="text-sm text-gray-500">Veuillez d'abord créer le contenu dans la base de données</p>
      </div>
    )
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

      {!editing && (
        <button
          onClick={() => setEditing(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          <Zap size={20} />
          Modifier le Contenu
        </button>
      )}

      {editing && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">✏️ Modifier Notre Mission</h3>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Titre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Titre Principal *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Description 1 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Premier Paragraphe *
              </label>
              <textarea
                value={formData.description1 || ''}
                onChange={(e) => setFormData({ ...formData, description1: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                required
              />
            </div>

            {/* Description 2 */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deuxième Paragraphe *
              </label>
              <textarea
                value={formData.description2 || ''}
                onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                URL de l'Image
              </label>
              <input
                type="text"
                value={formData.image_url || ''}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="ex: /images/img1.jpg"
              />
            </div>

            {/* Stats */}
            <div className="border-t pt-6">
              <h4 className="font-bold text-gray-900 mb-4">📊 Statistiques</h4>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Label Stat 1
                  </label>
                  <input
                    type="text"
                    value={formData.stats_label1 || ''}
                    onChange={(e) => setFormData({ ...formData, stats_label1: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: Membres actifs"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valeur Stat 1
                  </label>
                  <input
                    type="text"
                    value={formData.stats_value1 || ''}
                    onChange={(e) => setFormData({ ...formData, stats_value1: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: 500+"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Label Stat 2
                  </label>
                  <input
                    type="text"
                    value={formData.stats_label2 || ''}
                    onChange={(e) => setFormData({ ...formData, stats_label2: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: Années d'expérience"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Valeur Stat 2
                  </label>
                  <input
                    type="text"
                    value={formData.stats_value2 || ''}
                    onChange={(e) => setFormData({ ...formData, stats_value2: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ex: 15+"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t">
              <button
                type="submit"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <Save size={18} />
                Enregistrer les Modifications
              </button>
              <button
                type="button"
                onClick={() => {
                  setEditing(false)
                  setFormData(content)
                  setError('')
                }}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                <X size={18} />
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Preview */}
      {!editing && (
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">👁️ Aperçu</h3>
          
          <div className="space-y-4 mb-6">
            <h4 className="text-xl font-bold text-gray-900">{content.title}</h4>
            <p className="text-gray-600 leading-relaxed">{content.description1}</p>
            <p className="text-gray-600 leading-relaxed">{content.description2}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-rose-100 to-rose-50 p-4 rounded-xl border border-rose-200">
              <p className="text-3xl font-bold text-gray-900">{content.stats_value1}</p>
              <p className="text-sm text-gray-600">{content.stats_label1}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-purple-50 p-4 rounded-xl border border-purple-200">
              <p className="text-3xl font-bold text-gray-900">{content.stats_value2}</p>
              <p className="text-sm text-gray-600">{content.stats_label2}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
