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
export const ProfileTemplate = () => {
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
      <nav className='absolute py-16 px-5 flex flex-col justify-between items-center top-0 left-0 bg-primary -translate-x-80 lg:-translate-x-0 lg:w-80 h-full z-10 transition-all'>
        {/* TOP SECTION */}
        <div className='flex flex-col items-center justify-start gap-7'>
          {/* PROFILE PICTURE */}
          <div className='relative rounded-2xl overflow-clip w-64 h-48 bg-[#D2EFFC]'>
            <img
              src={auth?.currentUser?.photoURL ?? ''}
              alt=''
              className='w-full h-full object-contain'
            />
            <div className='absolute right-2 bottom-16'>
              <button onClick={() => toggleUploadModal.open()}>
                <img
                  src={Camera}
                  alt='camera'
                />
              </button>
            </div>
            <div className='absolute p-3 pb-1 grid grid-rows-2 w-full bottom-0 bg-white text-left'>
              <span className='font-semibold text-base'>
                {auth?.currentUser?.displayName}
              </span>
              <span className='font-normal text-xs align-middle'>
                {auth?.currentUser?.email}
              </span>
            </div>
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
      <div className='absolute top-0 w-full flex items-center justify-center h-24 bg-[#68B0D1] lg:pl-80'>
        <h1 className='text-white font-bold text-3xl'>Profil</h1>
      </div>

      {/* CONTENT */}
      <main className='flex items-center justify-center min-h-screen pt-24 lg:pl-80'>
        <Outlet />
      </main>
    </>
  )
}
