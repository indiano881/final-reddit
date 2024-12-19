import { z } from 'zod'

// actions

export const signUpSchema = z.object({
  username: z.string().min(2, 'username must be at least 2 characters'),
  password: z.string().min(6, 'password must be at least 6 characters'),
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const logInSchema = z.object({
  username: z.string().min(1, 'username is required'),
  password: z.string().min(1, 'password is required'),
})

export type LogInValues = z.infer<typeof logInSchema>

export const postActionSchema = z.object({
  title: z.string().min(1, 'title is required'),
  content: z.string().optional(),
})

export type PostValues = z.infer<typeof postActionSchema>

// data

export const profileSchema = z.object({
  username: z.string(),
  id: z.string(),
})

export type ProfileData = z.infer<typeof profileSchema>

export const postPageSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional(),
  author: z.object({
    username: z.string(),
    id: z.string(),
  }),
})

export type PostPageData = z.infer<typeof postPageSchema>

export const homepagePostsSchema = z.object({
  posts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      author: z.object({
        username: z.string(),
      }),
      score: z.number(),
      upvotes: z.array(z.string()),
      downvotes: z.array(z.string()),
    }),
  ),
  nextPage: z.number().nullable(),
})

export type HomepagePostsData = z.infer<typeof homepagePostsSchema>
