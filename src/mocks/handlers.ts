import { http, HttpResponse, delay } from 'msw'
import { config } from '@/config'

const { baseFirstUrl, baseSecondUrl } = config

export function buildUserNameFetch() {
  return http.get(`${baseFirstUrl}/user`, async () => {
    await delay(2000)
    return HttpResponse.json({
      id: 'user-id',
      name: 'user name',
    })
  })
}

export function buildUserNameFetchLoading() {
  return http.get(`${baseFirstUrl}/user`, async () => {
    await delay('infinite')
  })
}

export function buildUserNameFetchError() {
  return http.get(`${baseFirstUrl}/user`, async () => {
    await delay(200)
    // client error
    return HttpResponse.json('client error: not found', { status: 404 })
    // server error
    // return HttpResponse.json('server error: bad gateway', { status: 502 })
    // network error
    // return HttpResponse.error()
  })
}

export function buildUserDescriptionFetch() {
  return http.get(`${baseSecondUrl}/user`, async () => {
    await delay(2000)
    return HttpResponse.json({
      id: 'user-id',
      description: 'user description',
    })
  })
}

export function buildUserDescriptionFetchLoading() {
  return http.get(`${baseSecondUrl}/user`, async () => {
    await delay('infinite')
  })
}

export function buildUserDescriptionFetchError() {
  return http.get(`${baseSecondUrl}/user`, async () => {
    await delay(200)
    // client error
    return HttpResponse.json('not found', { status: 404 })
    // server error
    // return HttpResponse.json('server error: bad gateway', { status: 502 })
    // network error
    // return HttpResponse.error()
  })
}

export const handlers = [buildUserNameFetch(), buildUserDescriptionFetch()]
