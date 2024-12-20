import { notFound } from 'next/navigation'
import Link from 'next/link'

import { getPost } from '@/lib/queries'
import { auth } from '@/lib/auth'
import { DeletePostButton } from '@/components/delete-post-button'
import CreateComment from '@/components/createComment'

export const revalidate = 900 

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const post = await getPost(id)
  
  if (!post) {
    return notFound()
  }

  const user = await auth.getUser()
  const isAuthor = user && user.id === post.author.id

  return (
    <main className='main'>
      <article className='space-y-4'>
        <header className='flex items-start justify-between'>
          <div className='space-y-1'>
            <span className='text-zinc-600'>{post.author.username}</span>
            <h1 className='text-2xl font-bold'>{post.title}</h1>
          </div>
          {isAuthor && (
            <div className='flex gap-3'>
              <Link href={`/post/${post.id}/edit`} className='button-secondary'>
                edit
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          )}
        </header>
        <p>{post.content}</p>
      </article>
      <section className="comments">
          {post.comments.length > 0 ? (
            post.comments.map((item, index) => (
              <div key={index} className="comment space-y-2">
                <p className="text-zinc-800">{item.content}</p>
                <p className="text-sm text-zinc-600">by {item.author.username}</p>
              </div>
            ))
          ) : (
            <p>No comments available</p>
          )}
        </section>
      {user && <><CreateComment postId={post.id} /></>}
    </main>
  )
}
