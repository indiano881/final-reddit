"use client"

import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { createComment } from '@/actions/create-comment';
import { handleServerActionError, toastServerError } from '@/lib/error-handling';
import { commentActionSchema, CommentValues } from '@/lib/schemas';

interface CreateCommentProps {
  postId: string; // Add postId as a prop
}

export default function CreateComment({ postId }: CreateCommentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentActionSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CommentValues) => {
      // Pass the expected shape to `createComment`
      return handleServerActionError(
        await createComment({
          data: values,
          postId,
        })
      );
    },
    onError: toastServerError,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col gap-4 pt-6"
    >
      <textarea
        {...register('content')}
        placeholder="Write your comment here"
        className={`textarea ${errors.content ? 'textarea-error' : ''}  input min-h-24 rounded-3xl`}
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}
      <button type="submit" disabled={isPending} className='button-secondary'>
        {isPending ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
