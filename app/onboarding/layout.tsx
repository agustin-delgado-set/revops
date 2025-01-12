import React from 'react'
import Header from './components/header'

interface LayoutProps {
  children?: React.ReactNode
}

export default function OnboardingLayout({ children }: LayoutProps) {
  return (
    <div className="bg-accent h-full flex flex-col">
      <Header />
      <div className='p-4 h-full'>
        {children}
      </div>
    </div>
  )
}
