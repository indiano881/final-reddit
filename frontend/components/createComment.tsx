"use client"

import { createComment } from '@/actions/create-comment';
import { handleServerActionError, toastServerError } from '@/lib/error-handling';
import { commentActionSchema, CommentValues } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

export default function CreateComment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentActionSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: CommentValues) => {
      handleServerActionError(await createComment(values));
    },
    onError: toastServerError,
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col gap-4"
    >
      <textarea
        {...register('content')}
        placeholder="Write your comment here"
        className={`textarea ${errors.content ? 'textarea-error' : ''}`}
      />
      {errors.content && (
        <p className="text-red-500 text-sm">{errors.content.message}</p>
      )}
      <button type="submit" disabled={isPending}>
        {isPending ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}
