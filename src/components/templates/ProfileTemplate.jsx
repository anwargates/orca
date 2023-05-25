import { useDisclosure } from '@mantine/hooks'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
// @ts-ignore
import Bell from '../../assets/bell.svg'
// @ts-ignore
import Camera from '../../assets/camera.svg'
// @ts-ignore
import Cart from '../../assets/cart.svg'
// @ts-ignore
import Home from '../../assets/home.svg'
// @ts-ignore
import Logout from '../../assets/logout.svg'
// @ts-ignore
import Profile from '../../assets/profile.svg'
import { auth } from '../../config/firebase'
import { useStore } from '../../global/store'
import { UploadProfilePicModal } from '../modals/UploadProfilePicModal'

{
  /* PROFILE TEMPLATE */
}
export const ProfileTemplate = () => {
  // @ts-ignore
  const { isLoggedIn, setLoggedIn } = useStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth)
      .then(setLoggedIn(false))
      .then(() => navigate('/'))
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
            <li>
              <Link
                to='/profile/notifikasi'
                className='flex text-white font-semibold gap-12'>
                <img
                  src={Bell}
                  alt=''
                  className='w-8'
                />
                <span className='text-2xl'>Notifikasi</span>
              </Link>
            </li>
            <li>
              <Link
                to='/profile/pesanan'
                className='flex text-white font-semibold gap-12'>
                <img
                  src={Cart}
                  alt=''
                  className='w-8'
                />
                <span className='text-2xl'>Pesanan</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* BOTTOM BUTTON */}
        <div className='flex flex-col gap-4'>
          <button
            className='flex w-44 gap-2 text-white items-center justify-around text-xl font-semibold bg-[#68B0D1] py-2 px-4 rounded-xl'
            onClick={() => navigate('/')}>
            <img
              src={Home}
              alt='logout'
            />
            Home
          </button>
          <button
            className='flex w-44 gap-2 text-white items-center justify-around text-xl font-semibold bg-[#68B0D1] py-2 px-4 rounded-xl'
            onClick={handleLogout}>
            <img
              src={Logout}
              alt='logout'
            />
            Logout
          </button>
        </div>
      </nav>

      {/* TOP BAR */}
      <div className='absolute top-0 w-full flex items-center justify-center h-24 bg-[#68B0D1] lg:pl-80'>
        <h1 className='text-white font-bold text-3xl'>Profil</h1>
      </div>

      {/* CONTENT */}
      <main className='flex items-start justify-center min-h-screen pt-32 lg:pl-80'>
        <Outlet />
      </main>
    </>
  )
}
