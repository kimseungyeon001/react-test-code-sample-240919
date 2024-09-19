import { render, screen } from '@testing-library/react'
import { UserPage } from './UserPage'
import { TestWrapper } from '@/utils/TestWrapper'
import { mockServer } from '@/mocks/server'
import {
  buildUserFetch,
  buildUserFetchClientError,
  buildUserFetchServerError,
  buildUserFetchNetworkError,
} from '@/mocks/handlers'

describe('Test UserPage', () => {
  test('after loading, user information is displayed', async () => {
    mockServer.use(buildUserFetch())
    render(
      <TestWrapper>
        <UserPage />
      </TestWrapper>,
    )

    const loading = await screen.findByTestId('user-loading')
    expect(loading).toBeInTheDocument()
    expect(loading).toHaveTextContent('...loading')

    const userPage = await screen.findByTestId('user-page')
    expect(userPage).toBeInTheDocument()
    expect(userPage).toHaveTextContent('Hello john.')
  })

  test('After loading, user information is not displayed and client error message is displayed', async () => {
    mockServer.use(buildUserFetchClientError())
    render(
      <TestWrapper>
        <UserPage />
      </TestWrapper>,
    )

    const loading = await screen.findByTestId('user-loading')
    expect(loading).toBeInTheDocument()

    const userErrorMessage = await screen.findByTestId('user-error-message')
    expect(userErrorMessage).toBeInTheDocument()
    expect(userErrorMessage).toHaveTextContent('Not Found')
  })

  test('After loading, user information is not displayed and server error message is displayed', async () => {
    mockServer.use(buildUserFetchServerError())
    render(
      <TestWrapper>
        <UserPage />
      </TestWrapper>,
    )

    const loading = await screen.findByTestId('user-loading')
    expect(loading).toBeInTheDocument()

    const userErrorMessage = await screen.findByTestId('user-error-message')
    expect(userErrorMessage).toBeInTheDocument()
    expect(userErrorMessage).toHaveTextContent('Bad Gateway')
  })

  test('After loading, user information is not displayed and network error message is displayed', async () => {
    mockServer.use(buildUserFetchNetworkError())
    render(
      <TestWrapper>
        <UserPage />
      </TestWrapper>,
    )

    const loading = await screen.findByTestId('user-loading')
    expect(loading).toBeInTheDocument()

    const userErrorMessage = await screen.findByTestId('user-error-message')
    expect(userErrorMessage).toBeInTheDocument()
    expect(userErrorMessage).toHaveTextContent('Failed to fetch')
  })
})
