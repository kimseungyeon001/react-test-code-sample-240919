import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { TestWrapper } from '@/utils/TestWrapper'
import { mockServer } from '@/mocks/server'
import { buildUserPost, buildUserPostServerError } from '@/mocks/handlers'
import { routes } from '@/App'

// NOTE: Write your test code with as many cases as possible.
describe('Test UserRegisterPage', () => {
  test('User registration is successful and to the User page.', async () => {
    const user = userEvent.setup()
    mockServer.use(buildUserPost())
    const router = createMemoryRouter(routes, { initialEntries: ['/register'] })

    render(
      <TestWrapper>
        <RouterProvider router={router} />
      </TestWrapper>,
    )

    const userRegisterPage = await screen.findByTestId('userRegisterPage')
    expect(userRegisterPage).toBeInTheDocument()

    const nameInput = await screen.findByTestId('nameInput')
    const registerButton = await screen.findByTestId('registerButton')
    expect(registerButton).toBeDisabled()

    await user.type(nameInput, 'john')
    expect(registerButton).toBeEnabled()

    await user.click(registerButton)

    const userPage = await screen.findByTestId('userPage')
    expect(userPage).toBeInTheDocument()
  })

  test('Registration will not be possible because a validation error.', async () => {
    const user = userEvent.setup()
    mockServer.use(buildUserPost())
    const router = createMemoryRouter(routes, {
      initialEntries: ['/register'],
    })

    render(
      <TestWrapper>
        <RouterProvider router={router} />
      </TestWrapper>,
    )

    const userRegisterPage = await screen.findByTestId('userRegisterPage')
    expect(userRegisterPage).toBeInTheDocument()

    const nameInput = await screen.findByTestId('nameInput')
    const registerButton = await screen.findByTestId('registerButton')
    expect(registerButton).toBeDisabled()

    await user.type(nameInput, 'johnnnnn')
    expect(registerButton).toBeDisabled()
    await user.click(registerButton)
    expect(registerButton).toBeDisabled()
  })

  test('Error message after user registration fails because a server error.', async () => {
    const user = userEvent.setup()
    mockServer.use(buildUserPostServerError())
    const router = createMemoryRouter(routes, {
      initialEntries: ['/register'],
    })

    render(
      <TestWrapper>
        <RouterProvider router={router} />
      </TestWrapper>,
    )

    const userRegisterPage = await screen.findByTestId('userRegisterPage')
    expect(userRegisterPage).toBeInTheDocument()

    const nameInput = await screen.findByTestId('nameInput')
    const registerButton = await screen.findByTestId('registerButton')
    expect(registerButton).toBeDisabled()

    await user.type(nameInput, 'john')
    expect(registerButton).toBeEnabled()

    await user.click(registerButton)

    const userRegisterMutationErrorMessage = await screen.findByTestId(
      'userRegisterMutationErrorMessage',
    )
    expect(userRegisterMutationErrorMessage).toBeInTheDocument()
    expect(userRegisterMutationErrorMessage).toHaveTextContent('')
  })
})
