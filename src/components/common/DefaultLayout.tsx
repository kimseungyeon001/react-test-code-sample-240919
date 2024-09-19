import { PropsWithChildren } from 'react'

export function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-full">
      {/* main */}
      {children}
    </div>
  )
}
