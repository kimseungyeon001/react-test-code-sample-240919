import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/index.css'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { MemoryRouter } from 'react-router-dom'

// // Start Mock Service Worker
initialize({ onUnhandledRequest: 'bypass' })

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  loaders: [mswLoader],
  decorators: [
    (Story) => {
      return (
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      )
    },
  ],
}

export default preview
