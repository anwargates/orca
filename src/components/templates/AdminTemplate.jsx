import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import Home from '../../assets/home.svg'
import Profile from '../../assets/profile.svg'
import Logout from '../../assets/logout.svg'
import Camera from '../../assets/camera.svg'
import { useStore } from '../../global/store'
import { useDisclosure } from '@mantine/hooks'
import { UploadProfilePicModal } from '../modals/UploadProfilePicModal'

{
  /* PROFILE TEMPLATE */
}
export const AdminTemplate = () => {
  const { isLoggedIn, setLoggedIn } = useStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth).then(setLoggedIn(false)).then(navigate('/'))
  }
  const [showUploadModal, toggleUploadModal] = useDisclosure()

  return (
    <>
      {/* PROFILE PICTURE UPLOAD MODAL */}
      <UploadProfilePicModal
        opened={showUploadModal}
        modalHandler={toggleUploadModal}
      />

      {/* SIDEBAR */}
      <nav className='absolute py-8 flex flex-col justify-between items-center top-0 left-0 bg-primary -translate-x-52 lg:-translate-x-0 lg:w-56 h-full z-10 transition-all'>
        {/* TOP SECTION */}
        <div className='w-full flex flex-col items-center justify-start gap-7'>
          {/* SIDEBAR HEADER */}
          <div className='font-bold text-2xl text-center text-white'>
            Orcaaaa
          </div>

          {/* DIVIDER */}
          <div className='flex w-full bg-white h-1' />

          {/* NAV ITEMS */}
          <ul className='flex flex-col list-none gap-11'>
            <li>
              <Link
                to='/'
                className='flex text-white font-semibold gap-12'>
                <img
                  src={Home}
                  alt=''
                  className='w-8'
                />
                <span className='text-2xl'>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to='/profile'
                className='flex text-white font-semibold gap-12'>
                <img
                  src={Profile}
                  alt=''
                  className='w-8'
                />
                <span className='text-2xl'>Profil</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* LOGOUT BUTTON */}
        <button
          className='flex w-44 gap-2 text-white items-center text-xl font-semibold bg-[#68B0D1] py-2 px-4 rounded-xl'
          onClick={handleLogout}>
          <img
            src={Logout}
            alt='logout'
          />
          Logout
        </button>
      </nav>

      {/* TOP BAR */}
      <div className='absolute top-0 w-full flex items-center justify-center h-24 bg-[#68B0D1] lg:pl-56'>
        <h1 className='text-white font-bold text-3xl'>Konfirmasi Pembayaran</h1>
      </div>

      {/* CONTENT */}
      <main className='flex min-h-screen pt-24 lg:pl-56'>
        <Outlet />
      </main>
    </>
  )
}
