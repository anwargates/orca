import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../global/store'
import { useDisclosure } from '@mantine/hooks'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase'
import { Notification } from '@mantine/core'
import { BsX } from 'react-icons/bs'
// @ts-ignore
import LogoOrca from '../../assets/logo-orca.svg'

export const AdminSignIn = () => {
  const navigate = useNavigate()
  //   const [pending, setPending] = useState(false)
  const { setLoggedIn, actionLoading, setActionLoading } = useStore()
  const [errorMessage, setErrorMessage] = useState('')
  const [isNotify, toggleNotify] = useDisclosure(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setActionLoading(true)
    console.log(data)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        setLoggedIn(true)
        setActionLoading(false)
        navigate('/admin')
        // ...
      })
      .catch((e) => {
        console.log(e)
        setActionLoading(false)
        setErrorMessage(e.message)
        toggleNotify.open()
      })
  }

  return (
    <>
      <Notification
        icon={<BsX size='1.1rem' />}
        color='red'
        title='LOGIN GAGAL'
        className={`absolute z-50 left-0 right-0 w-fit m-auto transition-all ease-in-out ${
          isNotify ? 'top-2' : '-top-28'
        }`}
        onClose={() => toggleNotify.close()}>
        {errorMessage}
      </Notification>

      <div className='w-full h-screen flex justify-center items-center bg-[#88CEEF80]'>
        <div className='h-full flex flex-col justify-evenly items-center gap-4'>
          <img
            className='w-52'
            src={LogoOrca}
            alt='logo-orca'
          />
          <div>
            <h1 className='text-6xl font-bold mb-2'>Admin Orcaaaa</h1>
            <h3 className='text-2xl font-light'>Masuk sebagai admin</h3>
          </div>
          <form
            className='flex flex-col gap-8 text-left w-96'
            onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
              <label
                className='font-normal'
                htmlFor='email'>
                Email
              </label>
              <input
                className='input-field'
                type='email'
                placeholder='Email'
                {...register('email', {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className='flex flex-col'>
              <label
                className='font-normal'
                htmlFor='password'>
                Password
              </label>
              <input
                className='input-field'
                type='password'
                placeholder='Password'
                {...register('password', { required: true })}
              />
            </div>
            <input
              className='btn-submit'
              type='submit'
              value='Login'
            />
            {/* {pending ? (
              <div className='btn-submit flex items-center justify-center'>
                <BeatLoader color='#ffffff' />
              </div>
            ) : (
              
            )} */}
          </form>
        </div>
      </div>
    </>
  )
}
