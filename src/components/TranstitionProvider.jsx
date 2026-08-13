'use client'

import Navbar from './Navbar'

const TranstitionProvider = ({ children }) => {
  return (
    <div className="min-h-screen" style={{ background: 'transparent' }}>
      <Navbar />
      <main className="pt-16">
        {children}
      </main>
    </div>
  )
}

export default TranstitionProvider
