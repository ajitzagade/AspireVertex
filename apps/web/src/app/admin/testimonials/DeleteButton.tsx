'use client'

import { useTransition } from 'react'
import { deleteTestimonial } from '../actions'

export default function DeleteTestimonialButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition()
  return (
    <button
      className="admin-btn-danger"
      style={{ fontSize: '.72rem', padding: '.35rem .75rem' }}
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Delete testimonial from "${name}"?`)) return
        startTransition(() => deleteTestimonial(id))
      }}
    >
      {isPending ? '…' : 'Delete'}
    </button>
  )
}
