import { PropsWithChildren } from 'react'

export function Template({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-full">
      {/* main */}
      {children}
    </div>
  )
}
