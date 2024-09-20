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
    await delay(200)
    // client error
    return HttpResponse.json('Client error: not found', { status: 404 })
  })
}

export function buildUserFetchServerError() {
  return http.get(`${baseUrl}/user`, async () => {
    await delay(200)
    // server error
    return HttpResponse.json('Server error: bad gateway', { status: 502 })
  })
}

export function buildUserPost() {
  return http.post(`${baseUrl}/user`, async () => {
    await delay(200)
    return HttpResponse.json('success')
  })
}

export function buildUserPostClientError() {
  return http.post(`${baseUrl}/user`, async () => {
    await delay(200)
    // client error
    return HttpResponse.json('Client error: bad request', { status: 400 })
  })
}

export function buildUserPostServerError() {
  return http.post(`${baseUrl}/user`, async () => {
    await delay(200)
    // server error
    return HttpResponse.json('Server error: bad gateway', { status: 502 })
  })
}

export const handlers = [buildUserFetch(), buildUserPostServerError()]
