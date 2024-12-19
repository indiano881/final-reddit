'use server'

import { redirect } from 'next/navigation'

import {  signUpSchema, SignUpValues } from '../lib/schemas'
import { client } from '../lib/client'
import { handleAxiosError, ServerActionResponse } from '../lib/error-handling'


export const signUp = async (
  data: SignUpValues,
): Promise<ServerActionResponse> => {
  const parsedData = signUpSchema.parse(data)

  try {
    await client.post('/auth/sign-up', parsedData)
  } catch (error) {
    return handleAxiosError(error)
  }

  redirect('/auth/log-in')
}
