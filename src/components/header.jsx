import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoOrcaSmall from '../assets/logo-orca-small.svg'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

export const Header = () => {
  const [nav, setNav] = useState(false)

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <header className='absolute w-full top-0 z-50'>
      <nav className='bg-primary'>
        <div className='container flex max-w-7xl mx-auto h-[10vh] p-6 sm:px-16 sm:py-6 items-center justify-between gap-8'>
          <Link to='/'>
            <img
              src={LogoOrcaSmall}
              alt='orcalogo'
              className='w-4/5'
            />
          </Link>
          <div className='text-white'>
            <ul className='hidden lg:flex gap-8 justify-between'>
              <li>
                <Link
                  className='header-link-button'
                  to='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className='header-link-button'
                  to='/gabung'>
                  About
                </Link>
              </li>
              <li>
                <Link
                  className='header-link-button'
                  to='/tentang'>
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className='header-link-button'
                  to='/tentang'>
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className='header-link-button'
                  to='/tentang'>
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          <div
              onClick={handleNav}
              className='block text-white lg:hidden'>
              {!nav ? (
                <AiOutlineMenu size={20} />
              ) : (
                <AiOutlineClose size={20} />
              )}
            </div>
          <div className='hidden lg:flex items-center gap-4'>
            <Link to='/signup'><button className='w-28 h-12 bg-blue text-white'>SignUp</button></Link>
            <Link to='/signin'><button className='w-28 h-12 bg-white text-blue'>Login</button></Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
