import { useDisclosure } from '@mantine/hooks'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Home from '../../assets/home.svg'
import Dashboard from '../../assets/dashboard.svg'
import Payments from '../../assets/payments.svg'
import Logout from '../../assets/logout.svg'
import { auth } from '../../config/firebase'
import { useStore } from '../../global/store'
import { UploadProfilePicModal } from '../modals/UploadProfilePicModal'

{
  /* PROFILE TEMPLATE */
}
export const AdminTemplate = () => {
  // @ts-ignore
  const { isLoggedIn, setLoggedIn } = useStore()
  const navigate = useNavigate()
  const handleLogout = () => {
    // @ts-ignore
    signOut(auth).then(setLoggedIn(false)).then(navigate('/'))
  }
  const [showUploadModal, toggleUploadModal] = useDisclosure()

  return (
    <>
      {/* PROFILE PICTURE UPLOAD MODAL */}
      {/* <UploadProfilePicModal
        opened={showUploadModal}
        modalHandler={toggleUploadModal}
      /> */}

      {/* SIDEBAR */}
      <nav className='fixed z-20 py-8 flex flex-col justify-between items-center top-0 left-0 bg-primary -translate-x-52 lg:-translate-x-0 lg:w-56 h-full transition-all'>
        {/* TOP SECTION */}
        <div className='w-full flex flex-col items-center justify-start gap-7'>
          {/* SIDEBAR HEADER */}
          <div
            onClick={() => navigate('/')}
            className='hover:cursor-pointer font-bold text-2xl text-center text-white'>
            Orcaaaa
          </div>

          {/* DIVIDER */}
          <div className='flex w-full bg-white h-1' />

          {/* NAV ITEMS */}
          <ul className='flex flex-col list-none gap-11'>
            <li>
              <Link
                to='/admin'
                className='flex text-white font-semibold gap-4'>
                <img
                  src={Dashboard}
                  alt=''
                  className='w-8'
                />
                <span className='text-2xl'>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to='/admin/payments'
                className='flex text-white font-semibold gap-4'>
                <img
                  src={Payments}
                  alt=''
                  className='w-8'
                />
                <span className='text-2xl'>Payments</span>
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
      <div className='fixed z-10 top-0 w-full flex items-center justify-center h-24 bg-[#68B0D1] lg:pl-56'>
        <h1 className='text-white font-bold text-3xl'>Konfirmasi Pembayaran</h1>
      </div>

      {/* CONTENT */}
      <main className='flex min-h-screen pt-24 lg:pl-56'>
        <Outlet />
      </main>
    </>
  )
}
