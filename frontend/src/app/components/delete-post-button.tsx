'use client'

import { useMutation } from '@tanstack/react-query'

import { deletePost } from '@/actions/delete-post'
import { handleServerActionError, toastServerError } from '@/lib/error-handling'

export const DeletePostButton = ({ postId }: { postId: string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deletePost(postId))
    },
    onError: toastServerError,
  })

  return (
    <button onClick={() => mutate()} className='button-secondary'>
      {isPending ? 'deleting post...' : 'delete'}
    </button>
  )
}
