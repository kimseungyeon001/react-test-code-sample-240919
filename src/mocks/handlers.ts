import { http, HttpResponse, delay } from 'msw'
import { config } from '@/config'

const { baseUrl } = config

export function buildUserFetch() {
  return http.get(`${baseUrl}/user`, async () => {
    await delay(200)
    return HttpResponse.json({
      id: 'user-id-1',
      name: 'john',
    })
  })
}

export function buildUserFetchClientError() {
  return http.get(`${baseUrl}/user`, async () => {
    // client error
    return HttpResponse.json('Client error: not found', { status: 404 })
  })
}

export function buildUserFetchServerError() {
  return http.get(`${baseUrl}/user`, async () => {
    // server error
    return HttpResponse.json('Server error: bad gateway', { status: 502 })
  })
}

export function buildUserFetchNetworkError() {
  return http.get(`${baseUrl}/user`, async () => {
    await delay(200)
    // network error
    return HttpResponse.error()
  })
}

export const handlers = [buildUserFetch()]
