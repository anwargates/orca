import React from 'react'
import LogoOrca from '../assets/logo-orca.svg'
import { BiCopyright } from 'react-icons/bi'

export const Footer = () => {
  return (
    <footer className='w-full'>
      <div className='bg-primary h-[20vh]'>
        <div className='container flex items-stretch justify-between flex-wrap py-8 px-2 max-w-7xl mx-auto h-full text-white text-left'>
          <div className='flex items-stretch justify-center w-full md:w-2/4 '>
            <div className='flex'>
              <img
                src={LogoOrca}
                alt='logo orca'
                className='w-28 p-4'
              />
              <div className='flex flex-col p-2 items-center text-center justify-center'>
                <h1 className='font-extrabold text-2xl'>ORCAAA PHOTOWORKS</h1>
                <p>Lets make a beatiful memory</p>
              </div>
            </div>
          </div>
          <div className='md:flex gap-6 items-stretch justify-center text-sm hidden w-2/4'>
            <div className='flex flex-col p-2'>
              <ul>
                <li className='font-bold text-base'>LEARN MORE</li>
                <li>About Us</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div className='flex flex-col p-2'>
              <ul>
                <li className='font-bold text-base'>SOCIAL</li>
                <li>Instagram</li>
              </ul>
            </div>
            <div className='flex flex-col p-2'>
              <ul>
                <li className='font-bold text-base'>CONTACT</li>
                <li>Jl. Randu No.63X, Ciracas,</li>
                <li> Jakarta Timur 13740.</li>
                <li> orcaaa888@gmail.com</li>
                <li> +62 812 345 678</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-blueSecondary h-[5vh]'>
        <div className='container flex items-center gap-1 max-w-7xl py-2 px-10 mx-auto h-full text-white'>
          <BiCopyright />
          <p className='text-left text-sm sm:text-base'>2022 Orcaaa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
