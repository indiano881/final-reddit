'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

import { type HomepagePostsData } from '@/lib/schemas'
import { getPosts } from '@/lib/queries'
import { Votes } from './votes'

export const HomePosts = ({
  initialData,
  limit,
  userId,
}: {
  initialData: HomepagePostsData
  limit: number
  userId: string | null
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['posts'],
      queryFn: async ({ pageParam }) => {
        return await getPosts(limit, pageParam)
      },
      getNextPageParam: (lastPage) => lastPage?.nextPage,
      initialData: {
        pages: [initialData],
        pageParams: [1],
      },
      initialPageParam: 1,
    })

  const currentPosts = data.pages.map((page) => page?.posts || []).flat()

  return (
    <section className='flex flex-col items-center gap-4'>
      {currentPosts.map(({ id, title, author, score, upvotes, downvotes }) => (
        <Link
          key={id}
          href={`/post/${id}`}
          className='flex w-full flex-col rounded-3xl bg-white p-4'
        >
          <span className='text-zinc-600'>{author.username}</span>
          <h2 className='text-lg font-bold'>{title}</h2>
          <Votes
            postId={id}
            userId={userId}
            score={score}
            upvotes={upvotes}
            downvotes={downvotes}
          />
        </Link>
      ))}
      <Loader
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </section>
  )
}

const Loader = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: {
  hasNextPage: boolean
  isFetchingNextPage: boolean
  fetchNextPage: () => void
}) => {
  const loader = useRef(null)

  useEffect(() => {
    const { current: svg } = loader
    if (!svg) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && !isFetchingNextPage) {
        fetchNextPage()
      }
    })

    observer.observe(svg)
    return () => {
      observer.unobserve(svg)
    }
  }, [loader, fetchNextPage, isFetchingNextPage])

  if (!hasNextPage) {
    return null
  }

  return (
    <svg
      ref={loader}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='animate-spin'
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  )
}
