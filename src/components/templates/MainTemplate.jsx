import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Header'
import { Footer } from '../Footer'

export const MainTemplate = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
