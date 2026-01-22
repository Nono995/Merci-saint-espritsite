'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Save, X, Plus, Trash2, Edit2, Play, Image as ImageIcon, Music } from 'lucide-react'
import Image from 'next/image'

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

export default function PodcastsManager() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audio_url: '',
    episode: '',
    speaker: '',
    image_url: '',
    duration_seconds: 0,
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
  })
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchPodcasts()
  }, [])

  const fetchPodcasts = async () => {
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPodcasts(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      audio_url: '',
      episode: '',
      speaker: '',
      image_url: '',
      duration_seconds: 0,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
    })
    setAudioFile(null)
    setImageFile(null)
    setEditingId(null)
    setIsAdding(false)
    setError('')
  }

  const uploadFile = async (file: File, bucket: string) => {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)

    if (uploadError) throw uploadError

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName)
    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError('')

    try {
      let audio_url = formData.audio_url
      let image_url = formData.image_url

      if (audioFile) {
        audio_url = await uploadFile(audioFile, 'podcasts')
      }

      if (imageFile) {
        image_url = await uploadFile(imageFile, 'images')
      }

      const payload = {
        ...formData,
        audio_url,
        image_url,
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from('podcasts')
          .update(payload)
          .eq('id', editingId)
        if (updateError) throw updateError
        setSuccess('Podcast mis à jour !')
      } else {
        const { error: insertError } = await supabase
          .from('podcasts')
          .insert([payload])
        if (insertError) throw insertError
        setSuccess('Podcast ajouté !')
      }

      setTimeout(() => setSuccess(''), 3000)
      resetForm()
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Voulez-vous vraiment supprimer ce podcast ?')) return

    try {
      const { error: deleteError } = await supabase
        .from('podcasts')
        .delete()
        .eq('id', id)

      if (deleteError) throw deleteError
      setSuccess('Podcast supprimé !')
      setTimeout(() => setSuccess(''), 3000)
      fetchPodcasts()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la suppression')
    }
  }

  const startEdit = (podcast: Podcast) => {
    setEditingId(podcast.id)
    setFormData({
      title: podcast.title,
      description: podcast.description,
      audio_url: podcast.audio_url,
      episode: podcast.episode || '',
      speaker: podcast.speaker || '',
      image_url: podcast.image_url || '',
      duration_seconds: podcast.duration_seconds || 0,
      date: podcast.date || '',
    })
    setIsAdding(true)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-white">Gestion des Podcasts</h2>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-primary font-bold px-6 py-3 rounded-xl transition-all"
          >
            <Plus size={20} />
            Ajouter un Podcast
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl flex items-center gap-3">
          <X size={20} />
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-xl flex items-center gap-3">
          <Save size={20} />
          {success}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 rounded-2xl p-8 space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">
              {editingId ? 'Modifier le Podcast' : 'Nouveau Podcast'}
            </h3>
            <button type="button" onClick={resetForm} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Titre</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="ex: La Foi en Action"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Épisode</label>
                <input
                  type="text"
                  value={formData.episode}
                  onChange={(e) => setFormData({ ...formData, episode: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="ex: Épisode 12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Orateur</label>
                <input
                  type="text"
                  value={formData.speaker}
                  onChange={(e) => setFormData({ ...formData, speaker: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="ex: Pasteur Jean"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="ex: 15 Déc 2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Durée (en secondes)</label>
                <input
                  type="number"
                  value={formData.duration_seconds}
                  onChange={(e) => setFormData({ ...formData, duration_seconds: parseInt(e.target.value) })}
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none"
                  placeholder="ex: 1965"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-secondary outline-none"
              placeholder="Description du podcast..."
              rows={4}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Fichier Audio</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer hover:bg-gray-900 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Music className="text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">
                      {audioFile ? audioFile.name : 'Sélectionner un fichier MP3'}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="audio/*" onChange={(e) => setAudioFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <input
                type="text"
                value={formData.audio_url}
                onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-400 outline-none"
                placeholder="Ou URL directe"
              />
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400 mb-2">Image de couverture</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer hover:bg-gray-900 transition-all">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="text-gray-500 mb-2" />
                    <p className="text-sm text-gray-500">
                      {imageFile ? imageFile.name : 'Sélectionner une image'}
                    </p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <input
                type="text"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 text-sm text-gray-400 outline-none"
                placeholder="Ou URL directe"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 rounded-xl text-white hover:bg-white/5 transition-all"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-secondary hover:bg-secondary/90 text-primary font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Envoi...
                </>
              ) : (
                <>
                  <Save size={20} />
                  {editingId ? 'Mettre à jour' : 'Enregistrer'}
                </>
              )}
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-6">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col md:flex-row gap-6">
            <div className="relative w-full md:w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-900">
              {podcast.image_url ? (
                <Image src={podcast.image_url} alt={podcast.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-700">
                  <ImageIcon size={40} />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">{podcast.episode}</span>
                  <h4 className="text-xl font-bold text-white">{podcast.title}</h4>
                  <p className="text-sm text-gray-400">Par {podcast.speaker} • {podcast.date}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(podcast)}
                    className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all"
                    title="Modifier"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(podcast.id)}
                    className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                    title="Supprimer"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{podcast.description}</p>
              <div className="flex items-center gap-4 pt-2">
                <audio controls className="h-10 flex-1">
                  <source src={podcast.audio_url} />
                </audio>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
