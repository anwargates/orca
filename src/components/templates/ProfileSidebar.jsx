import { Navbar } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { auth } from '../../config/firebase'
import { UploadProfilePicModal } from '../modals/UploadProfilePicModal'
import { useStore } from '../../global/store'
import Bell from '../../assets/bell.svg'
import Camera from '../../assets/camera.svg'
import Cart from '../../assets/cart.svg'
import Home from '../../assets/home.svg'
import Logout from '../../assets/logout.svg'
import Profile from '../../assets/profile.svg'
import { modals } from '@mantine/modals'

const ProfileSidebar = ({opened}) => {
  const { isLoggedIn, setLoggedIn } = useStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth)
      .then(setLoggedIn(false))
      .then(() => navigate('/'))
  }

  const showModal = () => {
    modals.open({
      title: 'Upload Foto Profile',
      styles: {
        content: {
          position: 'relative',
        },
        title: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      children: <UploadProfilePicModal />,
    })
  }

  return (
    <Navbar
      height={'100%'}
      withBorder={false}
      bg={'#88CEEF'}
      p='md'
      width={{ base: 250, sm: 200, lg: 300 }}
      zIndex={1}
      hiddenBreakpoint='sm'
      hidden={!opened}>
      <Navbar.Section>
        <div className='relative h-[180px] rounded-2xl overflow-clip bg-[#D2EFFC]'>
          <img
            src={auth?.currentUser?.photoURL ?? ''}
            alt=''
            className='w-full object-contain'
          />
          <div className='absolute right-2 bottom-16'>
            <button onClick={showModal}>
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
      </Navbar.Section>
      <Navbar.Section mt={'md'}>
        <div className='flex w-full bg-white h-1' />
      </Navbar.Section>
      <Navbar.Section mt={'md'}>
        <Link
          to='/profile'
          className='flex text-white font-semibold justify-between gap-4'>
          <img
            src={Profile}
            alt=''
            className='w-6'
          />
          <span className='text-2xl text-left w-full'>Profil</span>
        </Link>
      </Navbar.Section>
      <Navbar.Section mt={'md'}>
        <Link
          to='/profile/notifikasi'
          className='flex text-white font-semibold justify-between gap-4'>
          <img
            src={Bell}
            alt=''
            className='w-6'
          />
          <span className='text-2xl text-left w-full'>Notifikasi</span>
        </Link>
      </Navbar.Section>
      <Navbar.Section mt={'md'}>
        <Link
          to='/profile/pesanan'
          className='flex text-white font-semibold justify-between gap-4'>
          <img
            src={Cart}
            alt=''
            className='w-6'
          />
          <span className='text-2xl text-left w-full'>Pesanan</span>
        </Link>
      </Navbar.Section>
      <Navbar.Section mt={'md'}>
        <button
          className='flex w-full gap-2 text-white items-center justify-around text-xl font-semibold bg-[#68B0D1] py-2 px-4 rounded-xl'
          onClick={() => navigate('/')}>
          <img
            src={Home}
            alt='logout'
          />
          Home
        </button>
      </Navbar.Section>
      <Navbar.Section mt={'md'}>
        <button
          className='flex w-full gap-2 text-white items-center justify-around text-xl font-semibold bg-[#68B0D1] py-2 px-4 rounded-xl'
          onClick={handleLogout}>
          <img
            src={Logout}
            alt='logout'
          />
          Logout
        </button>
      </Navbar.Section>
    </Navbar>
  )
}

export default ProfileSidebar
