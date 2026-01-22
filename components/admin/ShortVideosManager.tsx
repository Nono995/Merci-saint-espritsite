'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface ShortVideo {
  id: string
  title: string
  description: string
  video_url: string
  youtube_url: string
  thumbnail_url: string
  duration_seconds: number
  creator: string
}

const extractYoutubeVideoId = (url: string): string | null => {
  if (!url) return null
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts|live)\/|\S*?[?&]v=)|youtu\.be\/|youtube-nocookie\.com\/embed\/)([a-zA-Z0-9_-]{11})/i
  const match = url.match(regex)
  if (match && match[1]) return match[1]
  
  // Fallback for extremely weird URLs or just the ID itself
  const idMatch = url.match(/([a-zA-Z0-9_-]{11})/)
  if (url.length === 11 && idMatch) return url
  
  return null
}

const getYoutubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

export default function ShortVideosManager() {
  const [videos, setVideos] = useState<ShortVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [videoType, setVideoType] = useState<'upload' | 'youtube'>('upload')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    video_url: '',
    youtube_url: '',
    thumbnail_url: '',
    duration_seconds: 30,
    creator: '',
  })
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [videoDuration, setVideoDuration] = useState(0)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('short_videos')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setVideos(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  const getVideoDuration = (file: File): Promise<number> => {
    return new Promise((resolve) => {
      const video = document.createElement('video')
      video.onloadedmetadata = () => {
        resolve(Math.round(video.duration))
      }
      video.src = URL.createObjectURL(file)
    })
  }

  const handleVideoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (!file.type.startsWith('video/')) {
        setError('Veuillez sélectionner un fichier vidéo')
        return
      }

      const duration = await getVideoDuration(file)
      if (duration < 30 || duration > 40) {
        setError('La vidéo doit durer entre 30 et 40 secondes')
        return
      }

      setVideoDuration(duration)
      setFormData({ ...formData, duration_seconds: duration })
      setVideoFile(file)
      setError('')
    }
  }

  const handleYoutubeUrlChange = (url: string) => {
    setFormData({ ...formData, youtube_url: url })
    setError('')

    const videoId = extractYoutubeVideoId(url)
    if (videoId) {
      const thumbnail = getYoutubeThumbnail(videoId)
      setFormData((prev) => ({ ...prev, thumbnail_url: thumbnail }))
    }
  }

  const handleThumbnailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      if (!file.type.startsWith('image/')) {
        setError('Veuillez sélectionner une image')
        return
      }
      setThumbnailFile(file)
    }
  }

  const uploadVideo = async (file: File): Promise<string | null> => {
    try {
      const fileName = `video-${Date.now()}-${file.name}`
      const { error, data } = await supabase.storage
        .from('short-videos')
        .upload(fileName, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('short-videos')
        .getPublicUrl(fileName)

      return publicUrlData.publicUrl
    } catch (err) {
      setError(`Erreur upload vidéo: ${err instanceof Error ? err.message : 'Inconnue'}`)
      return null
    }
  }

  const uploadThumbnail = async (file: File): Promise<string | null> => {
    try {
      const fileName = `thumb-${Date.now()}-${file.name}`
      const { error, data } = await supabase.storage
        .from('short-videos')
        .upload(fileName, file)

      if (error) throw error

      const { data: publicUrlData } = supabase.storage
        .from('short-videos')
        .getPublicUrl(fileName)

      return publicUrlData.publicUrl
    } catch (err) {
      setError(`Erreur upload thumbnail: ${err instanceof Error ? err.message : 'Inconnue'}`)
      return null
    }
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title) {
      setError('Titre requis')
      return
    }

    if (videoType === 'upload' && !videoFile) {
      setError('Veuillez uploader une vidéo')
      return
    }

    if (videoType === 'youtube' && !formData.youtube_url) {
      setError('Veuillez entrer un lien YouTube')
      return
    }

    setUploading(true)
    try {
      let videoUrl: string | null = null
      let youtubeUrl: string | null = null

      if (videoType === 'upload' && videoFile) {
        videoUrl = await uploadVideo(videoFile)
        if (!videoUrl) return
      } else if (videoType === 'youtube') {
        youtubeUrl = formData.youtube_url
      }

      let thumbnailUrl: string | null = formData.thumbnail_url
      if (thumbnailFile) {
        const uploadedThumbnail = await uploadThumbnail(thumbnailFile)
        if (!uploadedThumbnail) return
        thumbnailUrl = uploadedThumbnail
      }

      const insertData: any = {
        title: formData.title,
        description: formData.description,
        thumbnail_url: thumbnailUrl,
        duration_seconds: formData.duration_seconds,
        creator: formData.creator,
        video_url: videoUrl,
        youtube_url: youtubeUrl
      }

      const { error } = await supabase
        .from('short_videos')
        .insert([insertData])

      if (error) throw error

      setFormData({
        title: '',
        description: '',
        video_url: '',
        youtube_url: '',
        thumbnail_url: '',
        duration_seconds: 30,
        creator: '',
      })
      setVideoFile(null)
      setThumbnailFile(null)
      setVideoType('upload')
      fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setUploading(false)
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingId) return

    setUploading(true)
    try {
      let videoUrl: string | null = formData.video_url
      let youtubeUrl: string | null = formData.youtube_url
      let thumbnailUrl: string | null = formData.thumbnail_url

      if (videoFile) {
        videoUrl = await uploadVideo(videoFile)
        if (!videoUrl) return
        youtubeUrl = null
      }

      if (thumbnailFile) {
        thumbnailUrl = await uploadThumbnail(thumbnailFile)
        if (!thumbnailUrl) return
      }

      const updateData: any = {
        title: formData.title,
        description: formData.description,
        thumbnail_url: thumbnailUrl,
        duration_seconds: formData.duration_seconds,
        creator: formData.creator,
      }

      if (videoUrl) {
        updateData.video_url = videoUrl
        updateData.youtube_url = null
      }
      if (youtubeUrl) {
        updateData.youtube_url = youtubeUrl
        updateData.video_url = null
      }

      const { error } = await supabase
        .from('short_videos')
        .update(updateData)
        .eq('id', editingId)

      if (error) throw error
      setEditingId(null)
      setFormData({
        title: '',
        description: '',
        video_url: '',
        youtube_url: '',
        thumbnail_url: '',
        duration_seconds: 30,
        creator: '',
      })
      setVideoFile(null)
      setThumbnailFile(null)
      setVideoType('upload')
      fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr?')) return

    try {
      const { error } = await supabase
        .from('short_videos')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchVideos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur')
    }
  }

  const startEdit = (video: ShortVideo) => {
    setEditingId(video.id)
    const isYoutube = !!video.youtube_url
    setVideoType(isYoutube ? 'youtube' : 'upload')
    setFormData({
      title: video.title,
      description: video.description,
      video_url: video.video_url || '',
      youtube_url: video.youtube_url || '',
      thumbnail_url: video.thumbnail_url || '',
      duration_seconds: video.duration_seconds,
      creator: video.creator,
    })
    setVideoFile(null)
    setThumbnailFile(null)
  }

  if (loading) return <div>Chargement...</div>

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-900 text-red-100 p-4 rounded-lg">{error}</div>
      )}

      <form
        onSubmit={editingId ? handleUpdate : handleAdd}
        className="bg-gray-700 p-6 rounded-lg space-y-4"
      >
        <h2 className="text-xl font-bold text-purple">
          {editingId ? 'Modifier' : 'Ajouter'} une Short Video
        </h2>

        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Titre"
          required
        />

        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Description"
          rows={3}
        />

        <input
          type="text"
          value={formData.creator}
          onChange={(e) => setFormData({ ...formData, creator: e.target.value })}
          className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
          placeholder="Créateur"
        />

        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="upload"
              checked={videoType === 'upload'}
              onChange={(e) => setVideoType(e.target.value as 'upload' | 'youtube')}
              className="w-4 h-4"
            />
            <span className="text-white">📤 Télécharger vidéo</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="youtube"
              checked={videoType === 'youtube'}
              onChange={(e) => setVideoType(e.target.value as 'upload' | 'youtube')}
              className="w-4 h-4"
            />
            <span className="text-white">🎥 Lien YouTube</span>
          </label>
        </div>

        {videoType === 'upload' ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-dashed border-gray-500 rounded-lg p-4">
              <label className="cursor-pointer block text-center">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoFileChange}
                  className="hidden"
                />
                <div className="text-gray-400 text-sm">
                  {videoFile ? (
                    <>
                      <div className="text-green-400 font-semibold">✅ Vidéo OK</div>
                      <div className="text-xs">{videoDuration}s sélectionnées</div>
                    </>
                  ) : (
                    <>
                      <div className="text-purple font-semibold">🎬 Vidéo</div>
                      <div className="text-xs">30-40s max</div>
                    </>
                  )}
                </div>
              </label>
            </div>

            <div className="border-2 border-dashed border-gray-500 rounded-lg p-4">
              <label className="cursor-pointer block text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailFileChange}
                  className="hidden"
                />
                <div className="text-gray-400 text-sm">
                  {thumbnailFile ? (
                    <>
                      <div className="text-green-400 font-semibold">✅ Couverture</div>
                      <div className="text-xs">Prête</div>
                    </>
                  ) : (
                    <>
                      <div className="text-purple font-semibold">🖼️ Couverture</div>
                      <div className="text-xs">Optionnel</div>
                    </>
                  )}
                </div>
              </label>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="url"
              value={formData.youtube_url}
              onChange={(e) => handleYoutubeUrlChange(e.target.value)}
              className="w-full bg-gray-600 text-white border border-gray-500 rounded-lg p-3 focus:outline-none focus:border-purple"
              placeholder="https://www.youtube.com/watch?v=... ou https://youtu.be/..."
              required
            />
            <p className="text-xs text-gray-400 mt-2">La miniature sera extraite automatiquement de YouTube</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={uploading}
            className="flex-1 bg-purple hover:bg-purple-dark disabled:opacity-50 px-6 py-2 rounded-lg font-semibold transition"
          >
            {uploading ? '⏳ Upload...' : editingId ? 'Mettre à jour' : 'Ajouter'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setFormData({
                  title: '',
                  description: '',
                  video_url: '',
                  youtube_url: '',
                  thumbnail_url: '',
                  duration_seconds: 30,
                  creator: '',
                })
                setVideoFile(null)
                setThumbnailFile(null)
                setVideoType('upload')
              }}
              className="flex-1 bg-gray-600 hover:bg-gray-500 px-6 py-2 rounded-lg font-semibold transition"
            >
              Annuler
            </button>
          )}
        </div>
      </form>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">Short Videos ({videos.length})</h3>
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-gray-700 p-4 rounded-lg flex gap-4"
          >
            {video.thumbnail_url && (
              <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-600">
                <Image
                  src={video.thumbnail_url}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <h4 className="font-bold text-white mb-1">{video.title}</h4>
              <p className="text-sm text-gray-300 mb-2">{video.description}</p>
              <p className="text-xs text-purple">
                👤 {video.creator} | ⏱️ {video.duration_seconds}s
              </p>
              {video.video_url ? (
                <video controls className="w-full mt-2 h-20 rounded bg-black">
                  <source src={video.video_url} type="video/mp4" />
                </video>
              ) : (
                <div className="mt-2 text-xs text-gray-400 bg-gray-600 p-2 rounded">
                  🎥 Vidéo YouTube
                </div>
              )}
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => startEdit(video)}
                className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
              >
                Éditer
              </button>
              <button
                onClick={() => handleDelete(video.id)}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
