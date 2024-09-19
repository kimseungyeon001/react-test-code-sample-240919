import { config } from '@/config'

const { baseFirstUrl, baseSecondUrl } = config

interface UserName {
  id: string
  name: string
}

interface UserDescription {
  id: string
  description: string
}

export interface UserProfile {
  id: string
  name: string
  description: string
}

class CustomError extends Error {
  statusCode: number

  constructor(message: string, status: number) {
    super(message)
    this.statusCode = status
  }
}

async function fetchUserName(): Promise<UserName> {
  try {
    const response = await fetch(`${baseFirstUrl}/user`)
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

async function fetchUserDescription(): Promise<UserDescription> {
  try {
    const response = await fetch(`${baseSecondUrl}/user`)
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

export async function fetchUserProfile(): Promise<UserProfile> {
  try {
    const userNameResponse = await fetchUserName()
    const userDescriptionResponse = await fetchUserDescription()
    return {
      id: userNameResponse.id,
      name: userNameResponse.name,
      description: userDescriptionResponse.description,
    }
  } catch (error: unknown) {
    // eslint-disable-next-line no-console
    console.warn('fetch-user-profile error', error)
    switch ((error as CustomError).statusCode) {
      case 404:
        throw new Error('not found')
      default:
        throw new Error('unexpected error')
    }
  }
}
