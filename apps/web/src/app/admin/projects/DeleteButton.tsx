'use client'

import { useTransition } from 'react'
import { deleteProject } from '../actions'

export default function DeleteButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return
    startTransition(async () => {
      await deleteProject(id)
    })
  }

  return (
    <button
      type="button"
      className="admin-btn-danger"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? '…' : 'Delete'}
    </button>
  )
}
