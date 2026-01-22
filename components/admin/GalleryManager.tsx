'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Trash2, Edit, Plus, Save, X, Image as ImageIcon, Check, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface GalleryItem {
  id: string
  title: string
  category: string
  date: string
  attendees: number
  image_url: string
  order_index: number
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Culte',
    date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
    attendees: 0,
    image_url: '',
    order_index: 0
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setItems(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const fileName = `gallery-${Date.now()}-${file.name.replace(/\s+/g, '_')}`
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage.from('images').getPublicUrl(fileName)
      return data.publicUrl
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'upload')
      return null
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Culte',
      date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      attendees: 0,
      image_url: '',
      order_index: items.length
    })
    setImageFile(null)
    setEditingId(null)
    setShowForm(false)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setError('')

    try {
      let image_url = formData.image_url

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile)
        if (!uploadedUrl) {
          setUploading(false)
          return
        }
        image_url = uploadedUrl
      }

      if (!image_url) {
        setError('Une image est requise')
        setUploading(false)
        return
      }

      const payload = { ...formData, image_url }

      if (editingId) {
        const { error } = await supabase
          .from('gallery_items')
          .update(payload)
          .eq('id', editingId)
        if (error) throw error
        setSuccess('Item mis à jour!')
      } else {
        const { error } = await supabase
          .from('gallery_items')
          .insert([payload])
        if (error) throw error
        setSuccess('Item ajouté!')
      }

      setTimeout(() => setSuccess(''), 3000)
      resetForm()
      fetchItems()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet item?')) return
    try {
      const { error } = await supabase
        .from('gallery_items')
        .delete()
        .eq('id', id)

      if (error) throw error
      setSuccess('Item supprimé!')
      setTimeout(() => setSuccess(''), 3000)
      fetchItems()
    } catch (err) {
      setError('Erreur lors de la suppression')
    }
  }

  const startEdit = (item: GalleryItem) => {
    setEditingId(item.id)
    setFormData(item)
    setShowForm(true)
  }

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader2 className="animate-spin h-12 w-12 text-indigo-600" />
    </div>
  )

  const categories = ['Culte', 'Célébration', 'Événement', 'Formation', 'Rencontre']

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-900">Galerie Photos</h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            Ajouter une Photo
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          <X size={18} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
          <Check size={18} />
          <span>{success}</span>
        </div>
      )}

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-900">
              {editingId ? '✏️ Modifier l\'image' : '➕ Ajouter une nouvelle photo'}
            </h4>
            <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Titre *</label>
                  <input
                    type="text"
                    placeholder="ex: Moment de louange"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                    <input
                      type="text"
                      placeholder="ex: Décembre 2024"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Participants</label>
                    <input
                      type="number"
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Photo *</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer hover:bg-gray-50 transition-all overflow-hidden relative">
                    {imageFile || formData.image_url ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={imageFile ? URL.createObjectURL(imageFile) : formData.image_url} 
                          alt="Preview" 
                          fill 
                          className="object-cover" 
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <p className="text-white text-sm font-bold">Changer l'image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <ImageIcon className="w-10 h-10 text-gray-400 mb-3" />
                        <p className="text-sm text-gray-500">Cliquez pour uploader</p>
                      </div>
                    )}
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                  </label>
                </div>
                <input
                  type="text"
                  placeholder="Ou URL de l'image"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-semibold"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md"
              >
                {uploading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Enregistrement...
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
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all group">
            <div className="relative h-48 w-full bg-gray-100">
              <Image src={item.image_url} alt={item.title} fill className="object-cover" />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold rounded-full shadow-sm">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-gray-900 mb-1 truncate">{item.title}</h4>
              <p className="text-xs text-gray-500 mb-4">{item.date} • {item.attendees} part.</p>
              
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(item)}
                  className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-3 py-2 rounded-lg text-sm font-bold transition-all"
                >
                  <Edit size={16} />
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex items-center justify-center w-10 h-10 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
