'use server'

import { redirect } from 'next/navigation'

import { logInSchema, LogInValues } from '../lib/schemas'
import { auth } from '../lib/auth'
import { client } from '../lib/client'
import { handleAxiosError, ServerActionResponse } from '../lib/error-handling'



export const logIn = async (
  data: LogInValues,
): Promise<ServerActionResponse> => {
  const parsedData = logInSchema.parse(data)

  try {
    const response = await client.post('/auth/log-in', parsedData)

    if (
      !response.data.accessToken ||
      typeof response.data.accessToken !== 'string'
    ) {
      return { error: 'access token missing' }
    }

    await auth.setAccessToken(response.data.accessToken)
  } catch (error) {
    return handleAxiosError(error)
  }

  redirect('/')
}
