import { cn } from '@/utils/classnames'

export const Votes = ({
  userId,
  score,
  upvotes,
  downvotes,
}: {
  postId: string
  userId: string | null
  score: number
  upvotes: string[]
  downvotes: string[]
}) => {
  return (
    <div className='mt-4 flex items-center gap-1'>
      <button
        className={cn(
          'button-tertiary',
          userId && upvotes.includes(userId) && 'text-primary',
        )}
      >
        ⬆︎
      </button>
      <span className='min-w-8 text-center'>{score}</span>
      <button
        className={cn(
          'button-tertiary',
          userId && downvotes.includes(userId) && 'text-primary',
        )}
      >
        ⬇︎
      </button>
    </div>
  )
}
