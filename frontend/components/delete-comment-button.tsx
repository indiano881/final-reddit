'use client'

import { useMutation } from '@tanstack/react-query'

import { handleServerActionError, toastServerError } from '@/lib/error-handling'
import { deleteComment } from '@/actions/delete-comment'

export const DeleteCommentButton = ({ postId, commentId }: { postId: string, commentId:string }) => {
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      handleServerActionError(await deleteComment(postId, commentId))
    },
    onError: toastServerError,
  })

  return (
    <button onClick={() => mutate()} className='button-secondary'>
      {isPending ? 'deleting comment...' : 'delete'}
    </button>
  )
}
