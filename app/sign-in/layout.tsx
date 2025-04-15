import React from 'react'

interface LayoutProps {
  children?: React.ReactNode
}

export default function SignInLayout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-[#002B89] p-6 md:p-10 overflow-hidden">
      {children}
    </div>
  )
}
