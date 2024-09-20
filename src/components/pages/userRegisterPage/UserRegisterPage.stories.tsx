import { within, expect, userEvent } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { TestWrapper } from '@/utils/TestWrapper'
import { buildUserPost } from '@/mocks/handlers'

import { UserRegisterPage } from './UserRegisterPage'

const meta: Meta<typeof UserRegisterPage> = {
  component: UserRegisterPage,
  decorators: [
    (Story) => (
      <TestWrapper>
        <Story />
      </TestWrapper>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof UserRegisterPage>

export const WithData: Story = {
  render: (_args) => <UserRegisterPage />,
  parameters: {
    msw: [buildUserPost()],
  },
  // Options
  // NOTE: You can write test code in a storybook to try out your tests inside the storybook.
  play: async ({ canvasElement }) => {
    const user = userEvent.setup()
    const canvas = within(canvasElement)

    const userPage = await canvas.findByTestId('userRegisterPage')
    expect(userPage).toBeInTheDocument()

    const nameInput = await canvas.findByTestId('nameInput')
    const registerButton = await canvas.findByTestId('registerButton')
    expect(registerButton).toBeDisabled()

    await user.type(nameInput, 'john')
    expect(registerButton).toBeEnabled()
  },
}
