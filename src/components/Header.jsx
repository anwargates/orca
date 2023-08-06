import { Avatar, Burger, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
// @ts-ignore
import LogoOrcaSmall from '../assets/logo-orca-small.svg'
// @ts-ignore
import ProfilePlaceholder from '../assets/profile-placeholder.svg'
import { auth } from '../config/firebase'
import { useStore } from '../global/store'

// HEADER NAVBAR COMPONENT
export const Header = () => {
  // const [nav, setNav] = useState(false)
  const [nav, { toggle, close }] = useDisclosure(false)
  const { isLoggedIn, setLoggedIn, isAdmin } = useStore()
  // const pending = useStore((state) => state.authRefreshing)
  // const isLoggedIn = useStore((state) => state.isLoggedIn)
  // const setPending = useStore((state) => state.setAuthRefreshing)
  const [pending, setPending] = useState(true)

  useEffect(() => {
    // setPending(true)
    // console.log(auth)
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user signed out
        console.log(user)
        setLoggedIn(true)
        setPending(false)
      } else {
        // user logged out
        console.log(user)
        setLoggedIn(false)
        setPending(false)
      }
    })
  }, [auth])

  // const handleNav = () => {
  //   setNav(!nav)
  // }

  return (
    <header className='w-full z-50'>
      <nav className='bg-primary'>
        <div className='default-container flex h-[10vh] p-6 sm:px-16 sm:py-6 items-center justify-between gap-8'>
          {/* LOGO */}
          <Link to='/'>
            <img
              src={LogoOrcaSmall}
              alt='orcalogo'
              className='h-[6vh] w-auto'
            />
          </Link>

          <div className='flex items-center gap-10'>
            {/* NAV LINKS */}
            <div className='text-white font-bold'>
              <ul className='hidden lg:flex gap-8 justify-between'>
                <li className='header-link-button'>
                  <Link
                    className='hover:text-gray-200'
                    to='/'>
                    Home
                  </Link>
                </li>
                <li className='header-link-button'>
                  <Link
                    className='hover:text-gray-200'
                    to='/photo-category'>
                    Pesan Sekarang
                  </Link>
                </li>
                <li className='header-link-button'>
                  <Link
                    className='hover:text-gray-200'
                    to='/gallery'>
                    Gallery
                  </Link>
                </li>
                <li className='header-link-button'>
                  <Link
                    className='hover:text-gray-200'
                    to='/tentang'>
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* NAV RIGHT BUTTON ON MOBILE */}
            <Burger
              className='block lg:hidden'
              color='white'
              opened={nav}
              onClick={toggle}
            />
            <Drawer
              opened={nav}
              onClose={close}
              position='right'
              size='xs'>
              <div className='font-bold'>
                <ul className='flex flex-col items-end justify-between gap-8'>
                  <li className='header-link-button'>
                    <Link
                      onClick={close}
                      className='hover:text-gray-200'
                      to='/'>
                      Home
                    </Link>
                  </li>
                  <li className='header-link-button'>
                    <Link
                      onClick={close}
                      className='hover:text-gray-200'
                      to='/photo-category'>
                      Pesan Sekarang
                    </Link>
                  </li>
                  <li className='header-link-button'>
                    <Link
                      onClick={close}
                      className='hover:text-gray-200'
                      to='/gallery'>
                      Gallery
                    </Link>
                  </li>
                  <li className='header-link-button'>
                    <Link
                      onClick={close}
                      className='hover:text-gray-200'
                      to='/tentang'>
                      About Us
                    </Link>
                  </li>
                  {isLoggedIn ? (
                  <li className='header-link-button'>
                    <Link
                      to={isAdmin ? '/admin' : '/profile'}
                      className='flex items-center gap-2'>
                      <Avatar
                        src={auth?.currentUser?.photoURL ?? ProfilePlaceholder}
                        alt='profile'
                        radius='xl'
                        size='6vh'
                      />
                    </Link>
                  </li>
                  ) : ( // if not signed in the show login button
                  <li className='flex items-center gap-4'>
                    <Link to='/signin'>
                      <button className='w-28 h-12 bg-white text-blue font-bold rounded-lg'>
                        Log In
                      </button>
                    </Link>
                  </li>
                  )}
                </ul>
              </div>
            </Drawer>

            {/* NAV RIGHT BUTTON ON DESKTOP */}
            {/*  check if still refreshing */}
            {pending ? (
              <div className='w-30 text-white'>
                <BeatLoader color='#ffffff' />
              </div>
            ) : // if signed in the show profile picture
            isLoggedIn ? (
              <Link
                to={isAdmin ? '/admin' : '/profile'}
                className='hidden lg:flex items-center gap-2'>
                <Avatar
                  src={auth?.currentUser?.photoURL ?? ProfilePlaceholder}
                  alt='profile'
                  radius='xl'
                  size='6vh'
                />
              </Link>
            ) : (
              // if not signed in the show login button
              <div className='hidden lg:flex items-center gap-4'>
                <Link to='/signin'>
                  <button className='w-28 h-12 bg-white text-blue font-bold rounded-lg'>
                    Log In
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
