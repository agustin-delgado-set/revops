import { ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export default function WelcomeLayout({ children }: LayoutProps) {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {children}
    </div>
  )
}