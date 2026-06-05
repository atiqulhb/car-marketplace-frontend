'use server'

import { cookies } from 'next/headers'
import { keystoneFetch } from '@/lib/keystone'
import { redirect } from 'next/navigation'


export default async function login(prevState: any, formData: FormData) {
  if (!formData) {
    return { success: false, error: 'No form data' }
  }

  const email = formData.get('email')
  const password = formData.get('password')

  if (!email || !password) {
    return { success: false, error: 'Missing fields' }
  }

  try {
    const data = await keystoneFetch(
      `
        mutation AuthenticateUserWithPassword($email: String!, $password: String!) {
          authenticateUserWithPassword(email: $email, password: $password) {
            ... on UserAuthenticationWithPasswordSuccess {
              item {
                id
                name
                email
              }
              sessionToken
            }
            ... on UserAuthenticationWithPasswordFailure {
              message
            }
          }
        }
      `,
      { email, password }
  )


  console.log('auth mutation data from login action', data)

  const { sessionToken, message } = data?.authenticateUserWithPassword


   if (sessionToken) {
       (await cookies()).set('keystonejs-session', sessionToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      redirect('/account')

      return { success: true, error: null }
   }

    return { success: false, error: message ?? 'Login Failed' }

  } catch(err) {

    return { success: false, error: err instanceof Error ? err.message : 'Login Failed' }
  }
}