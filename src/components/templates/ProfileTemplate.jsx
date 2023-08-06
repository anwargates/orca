import { useDisclosure } from '@mantine/hooks'
import { signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Bell from '../../assets/bell.svg'
import Camera from '../../assets/camera.svg'
import Cart from '../../assets/cart.svg'
import Home from '../../assets/home.svg'
import Logout from '../../assets/logout.svg'
import Profile from '../../assets/profile.svg'
import { auth } from '../../config/firebase'
import { useStore } from '../../global/store'
import { UploadProfilePicModal } from '../modals/UploadProfilePicModal'
import { AppShell, Burger, Header, MediaQuery, Navbar } from '@mantine/core'
import ProfileSidebar from './ProfileSidebar'

{
  /* PROFILE TEMPLATE */
}
export const ProfileTemplate = () => {
  const [opened, setOpened] = useState(false)

  const handleOpen = () => {
    setOpened(!opened)
  }

  return (
    <>
      <AppShell
        navbar={<ProfileSidebar opened={opened} />}
        header={
          <Header
            height={'10vh'}
            bg={'#68B0D1'}
            style={{
              display: 'flex',
              justifyContent: 'stretch',
              alignItems: 'center',
            }}
            withBorder={false}>
            <div className='flex-none px-4'>
              <MediaQuery
                largerThan='sm'
                styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => handleOpen()}
                  size='sm'
                  color='white'
                />
              </MediaQuery>
            </div>
            <div className='flex-1'>
              <h1 className='text-white font-bold text-3xl'>Profil</h1>
            </div>
          </Header>
        }
        children={<Outlet />}
        navbarOffsetBreakpoint='sm'
        asideOffsetBreakpoint='sm'
      />

      {/* <main className='flex items-start justify-center min-h-screen pt-[10vh] lg:pl-80'>
            <Outlet />
          </main> */}
    </>
  )
}
