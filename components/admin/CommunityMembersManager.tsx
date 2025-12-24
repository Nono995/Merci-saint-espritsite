'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Plus, Trash2, Edit2, X, Check, Users } from 'lucide-react'

interface CommunityMember {
  id: string
  name: string
  role: string
  image_url: string
  order_index: number
}

export default function CommunityMembersManager() {
  const [members, setMembers] = useState<CommunityMember[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image_url: '',
    order_index: 0,
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('community_members')
        .select('*')
        .order('order_index', { ascending: true })

      if (error) throw error
      setMembers(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.role.trim()) {
      setError('Le nom et le rôle sont requis')
      return
    }

    try {
      const newMember = {
        ...formData,
        order_index: members.length,
      }
      const { error } = await supabase.from('community_members').insert([newMember])

      if (error) throw error
      setFormData({ name: '', role: '', image_url: '', order_index: 0 })
      setShowForm(false)
      setSuccess('Membre ajouté avec succès')
      setTimeout(() => setSuccess(''), 3000)
      fetchMembers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    try {
      const { error } = await supabase
        .from('community_members')
        .update(formData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({ name: '', role: '', image_url: '', order_index: 0 })
      setShowForm(false)
      setSuccess('Membre mis à jour avec succès')
      setTimeout(() => setSuccess(''), 3000)
      fetchMembers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre?')) return

    try {
      const { error } = await supabase.from('community_members').delete().eq('id', id)

      if (error) throw error
      setSuccess('Membre supprimé')
      setTimeout(() => setSuccess(''), 3000)
      fetchMembers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (member: CommunityMember) => {
    setEditingId(member.id)
    setFormData({
      name: member.name,
      role: member.role,
      image_url: member.image_url,
      order_index: member.order_index,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setEditingId(null)
    setFormData({ name: '', role: '', image_url: '', order_index: 0 })
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
          Ajouter un Membre
        </button>
      )}

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            {editingId ? '✏️ Modifier le Membre' : '➕ Ajouter un Membre'}
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
                  placeholder="ex: Jean Martin"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rôle *
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="ex: Pasteur Principal"
                  required
                />
              </div>
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
                <div className="mt-3 relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 bg-gray-100">
                  <Image
                    src={formData.image_url}
                    alt="Aperçu"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
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
          Membres de l'Équipe ({members.length})
        </h3>

        {members.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
            <Users size={40} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">Aucun membre pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                {member.image_url && (
                  <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                    <Image
                      src={member.image_url}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 text-lg mb-1">{member.name}</h4>
                  <p className="text-sm text-indigo-600 font-semibold mb-4">{member.role}</p>
                  <p className="text-xs text-gray-500 mb-4">Ordre: {member.order_index}</p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(member)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Edit2 size={16} />
                      Éditer
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg font-semibold transition-colors"
                    >
                      <Trash2 size={16} />
                      Supprimer
                    </button>
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
