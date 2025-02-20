import { within, expect } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/react'
import { TestWrapper } from '@/utils/TestWrapper'
import { buildUserFetch } from '@/mocks/handlers'

import { UserPage } from './UserPage'

const meta: Meta<typeof UserPage> = {
  component: UserPage,
  decorators: [
    (Story) => (
      <TestWrapper>
        <Story />
      </TestWrapper>
    ),
  ],
}
export default meta

type Story = StoryObj<typeof UserPage>

export const WithData: Story = {
  render: (_args) => <UserPage />,
  parameters: {
    msw: [buildUserFetch()],
  },
  // Options
  // NOTE: You can write test code in a storybook to try out your tests inside the storybook.
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const loading = await canvas.findByTestId('userLoading')
    expect(loading).toBeInTheDocument()
    expect(loading).toHaveTextContent('...loading')

    const userPage = await canvas.findByTestId('userPage')
    expect(userPage).toBeInTheDocument()
    expect(userPage).toHaveTextContent('Hello john.')
  },
}
