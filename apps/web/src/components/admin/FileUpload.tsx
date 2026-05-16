'use client'

import { useState, useRef, useCallback } from 'react'

interface FileUploadProps {
  value: string
  onChange: (url: string) => void
  label: string
  accept?: string       // e.g. "image/*" or "application/pdf,image/*"
  hint?: string
  preview?: boolean     // show image preview
}

export default function FileUpload({
  value,
  onChange,
  label,
  accept = 'image/*',
  hint,
  preview = true,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPdf = value?.toLowerCase().endsWith('.pdf')
  const isImage = preview && value?.startsWith('http') && !isPdf

  const upload = useCallback(async (file: File) => {
    setUploading(true)
    setError('')
    setProgress('Uploading…')

    const fd = new FormData()
    fd.set('file', file)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        onChange(data.url)
        setProgress('')
      } else {
        setError(data.error || 'Upload failed')
        setProgress('')
      }
    } catch {
      setError('Network error — check connection')
      setProgress('')
    } finally {
      setUploading(false)
    }
  }, [onChange])

  function handleFiles(files: FileList | null) {
    if (files?.[0]) upload(files[0])
  }

  return (
    <div>
      <label className="admin-label">{label}</label>

      {/* URL input + Upload button */}
      <div style={{ display: 'flex', gap: '.5rem', alignItems: 'stretch' }}>
        <input
          className="admin-input"
          value={value}
          onChange={e => { setError(''); onChange(e.target.value) }}
          placeholder="Paste URL  —or—  upload a file →"
          style={{ flex: 1 }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            padding: '.5rem 1rem',
            background: uploading ? '#1a1a1a' : 'rgba(201,169,110,.1)',
            border: '1px solid rgba(201,169,110,.4)',
            color: '#c9a96e',
            fontSize: '.72rem',
            cursor: uploading ? 'default' : 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '.06em',
            transition: 'all .2s',
          }}
        >
          {uploading ? progress : '↑ Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          style={{ display: 'none' }}
          onChange={e => handleFiles(e.target.files)}
        />
      </div>

      {/* Drag & drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
        onClick={() => inputRef.current?.click()}
        style={{
          marginTop: '.4rem',
          padding: '.65rem',
          border: `1px dashed ${dragOver ? '#c9a96e' : '#2a2a2a'}`,
          textAlign: 'center',
          fontSize: '.65rem',
          color: dragOver ? '#c9a96e' : '#444',
          cursor: 'pointer',
          transition: 'all .2s',
          background: dragOver ? 'rgba(201,169,110,.04)' : 'transparent',
        }}
      >
        {hint || 'Drag & drop or click to browse'}
      </div>

      {/* Error */}
      {error && (
        <div style={{ marginTop: '.35rem', padding: '.4rem .7rem', background: 'rgba(127,29,29,.3)', border: '1px solid #7f1d1d', color: '#fca5a5', fontSize: '.72rem' }}>
          {error}
        </div>
      )}

      {/* Preview */}
      {isImage && (
        <div style={{ marginTop: '.5rem', position: 'relative', display: 'inline-block' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="" style={{ maxHeight: '100px', maxWidth: '100%', border: '1px solid #2a2a2a', objectFit: 'cover', display: 'block' }} />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: '4px', right: '4px', width: '20px', height: '20px', background: 'rgba(0,0,0,.7)', border: 'none', color: '#fff', fontSize: '.7rem', cursor: 'pointer', lineHeight: 1 }}
          >
            ×
          </button>
        </div>
      )}

      {isPdf && (
        <div style={{ marginTop: '.35rem', display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.72rem', color: '#86efac' }}>
          <span>📄</span>
          <a href={value} target="_blank" rel="noreferrer" style={{ color: '#86efac' }}>PDF uploaded — click to verify</a>
          <button type="button" onClick={() => onChange('')} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.72rem' }}>Remove</button>
        </div>
      )}
    </div>
  )
}
