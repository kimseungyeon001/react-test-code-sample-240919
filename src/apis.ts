import { config } from '@/config'

const { baseUrl } = config

export interface User {
  id: string
  name: string
}

export interface NewUser {
  name: string
}

class CustomError extends Error {
  statusCode: number

  constructor(message: string, status: number) {
    super(message)
    this.statusCode = status
  }
}

export async function fetchUser(): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/user`)
    switch (response.ok) {
      case true:
        return response.json()
      default:
        const message = response.statusText
        const statusCode = response.status
        throw new CustomError(message, statusCode)
    }
  } catch (error: unknown) {
    throw error
  }
}

export async function postUser(data: NewUser): Promise<User> {
  try {
    const response = await fetch(`${baseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    switch (response.ok) {
      case true:
        return response.json()
      default:
        const message = response.statusText
        const statusCode = response.status
        throw new CustomError(message, statusCode)
    }
  } catch (error: unknown) {
    throw error
  }
}
