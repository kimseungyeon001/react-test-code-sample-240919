import { PropsWithChildren } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

export function TestWrapper({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
