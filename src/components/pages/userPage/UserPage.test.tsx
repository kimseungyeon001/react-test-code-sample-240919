import { render, screen } from '@testing-library/react'
import { UserPage } from './UserPage'
import { TestWrapper } from '@/utils/TestWrapper'
import { mockServer } from '@/mocks/server'
import {
  buildUserFetch,
  buildUserFetchClientError,
  buildUserFetchServerError,
} from '@/mocks/handlers'

// NOTE: Write your test code with as many cases as possible.
describe('Test UserPage', () => {
  test('after loading, user information is displayed', async () => {
    mockServer.use(buildUserFetch())
    render(
      <TestWrapper>
        <UserPage />
      </TestWrapper>,
    )

    const loading = await screen.findByTestId('userLoading')
    expect(loading).toBeInTheDocument()
    expect(loading).toHaveTextContent('...loading')

    const userPage = await screen.findByTestId('userPage')
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

    const loading = await screen.findByTestId('userLoading')
    expect(loading).toBeInTheDocument()

    const userErrorMessage = await screen.findByTestId('userErrorMessage')
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

    const loading = await screen.findByTestId('userLoading')
    expect(loading).toBeInTheDocument()

    const userErrorMessage = await screen.findByTestId('userErrorMessage')
    expect(userErrorMessage).toBeInTheDocument()
    expect(userErrorMessage).toHaveTextContent('Bad Gateway')
  })
})
