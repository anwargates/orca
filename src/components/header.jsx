import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoOrcaSmall from '../assets/logo-orca-small.svg'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import {
  setPersistence,
  signInWithRedirect,
  browserSessionPersistence,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { BeatLoader } from 'react-spinners'
import { useStore } from '../global/store'
import ProfilePlaceholder from '../assets/profile-placeholder.svg'
import { Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

// HEADER NAVBAR COMPONENT
export const Header = () => {
  // const [nav, setNav] = useState(false)
  const [nav, { toggle }] = useDisclosure(false);
  const { isLoggedIn, setLoggedIn } = useStore()
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

  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <header className='absolute w-full top-0 z-50'>
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
            {/* <div
              onClick={handleNav}
              className='block text-white lg:hidden'>
              {!nav ? (
                <AiOutlineMenu size={20} />
              ) : (
                <AiOutlineClose size={20} />
              )}
            </div> */}

            <Burger className='block lg:hidden' color='white' opened={nav} onClick={toggle}/>

            {/* NAV RIGHT BUTTON ON DESKTOP */}
            {/*  check if still refreshing */}
            {pending ? (
              <div className='w-30 text-white'>
                <BeatLoader color='#ffffff' />
              </div>
            ) : // if signed in the show profile picture
            isLoggedIn ? (
              <Link
                to={'/profile'}
                className='hidden lg:flex items-center gap-2'>
                <img
                  src={auth?.currentUser?.photoURL ?? ProfilePlaceholder}
                  alt='profile'
                  className='w-auto h-[6vh] rounded-full'
                />
              </Link>
            ) : (
              // if not signed in the show login button
              <div className='hidden lg:flex items-center gap-4'>
                {/* <Link to='/signup'>
                  <button className='w-28 h-12 bg-blue text-white font-bold'>SignUp</button>
                </Link> */}
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
