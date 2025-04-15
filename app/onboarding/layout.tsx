import React from 'react'
import Header from './components/header'
import { UsersProvider } from './context'

interface LayoutProps {
  children?: React.ReactNode
}

export default function OnboardingLayout({ children }: LayoutProps) {
  return (
    <div className="bg-[#fafbfd] h-full flex flex-col">
      <Header />
      <div className='p-4 h-full'>
        <UsersProvider>
          {children}
        </UsersProvider>
      </div>
    </div>
  )
}
