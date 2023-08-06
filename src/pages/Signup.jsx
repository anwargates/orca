import { Notification } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BsX } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import BeatLoader from 'react-spinners/BeatLoader'
// @ts-ignore
import FacebookLogo from '../assets/facebook-logo.svg'
// @ts-ignore
import GoogleLogo from '../assets/google-logo.svg'
// @ts-ignore
import HorizontalLine from '../assets/line.svg'
// @ts-ignore
import LogoOrca from '../assets/logo-orca.svg'
import { auth, db, facebookProvider, googleProvider } from '../config/firebase'
import { useStore } from '../global/store'

export const SignUp = () => {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)
  const { setLoggedIn } = useStore()
  const [errorMessage, setErrorMessage] = useState('')
  const [isNotify, toggleNotify] = useDisclosure(false)

  useEffect(() => {
    console.log(auth)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // when submit button is pressed
  const onSubmit = (data) => {
    setPending(true)
    console.log(data)
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        handleCreateDoc(userCredential.user.uid)
        console.log(userCredential)
        // @ts-ignore
        updateProfile(auth.currentUser, {
          displayName: data.name,
        }).catch((e) => {
          console.log(e)
          setPending(false)
          setErrorMessage(e.message)
          toggleNotify.open()
        })
      })
      .catch((e) => {
        console.log(e)
        setPending(false)
        setErrorMessage(e.message)
        toggleNotify.open()
      })
  }
  console.log(errors)

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((user) => {
        const userInfo = getAdditionalUserInfo(user)
        if (userInfo?.isNewUser) handleCreateDoc(user.user.uid)
        console.log('signin with google success', user)
        // handleCreateDoc(user.user.uid)
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.message)
        toggleNotify.open()
      })
  }

  const handleFacebookSignIn = () => {
    signInWithPopup(auth, facebookProvider)
      .then((user) => {
        const userInfo = getAdditionalUserInfo(user)
        if (userInfo?.isNewUser) handleCreateDoc(user.user.uid)
        // handleCreateDoc(user.user.uid)
      })
      .catch((e) => {
        console.log(e)
        setErrorMessage(e.message)
        toggleNotify.open()
      })
  }

  const handleCreateDoc = async (id) => {
    await setDoc(doc(db, 'users', id), {
      phoneNumber: '',
      gender: '',
      isProfileCompleted: false,
    })
      .then((res) => {
        console.log('create doc success', res)
        setLoggedIn(true)
        setPending(false)
        navigate('/')
      })
      .catch((e) => {
        setErrorMessage(e.message)
        toggleNotify.open()
      })
  }

  return (
    <>
      <Notification
        icon={<BsX size='1.1rem' />}
        color='red'
        title='PENDAFTARAN GAGAL'
        className={`absolute z-50 left-0 right-0 w-fit m-auto transition-all ease-in-out ${
          isNotify ? 'top-2' : '-top-28'
        }`}
        onClose={() => toggleNotify.close()}>
        {errorMessage}
      </Notification>

      <div className='flex flex-row min-h-screen'>
        <div className='flex flex-col items-center justify-center bg-primary w-6/12 gap-28 px-24'>
          <div className='text-left'>
            <h1 className='text-black font-bold'>
              Welcome to <wbr /> Orcaaaa Gallery
            </h1>
            <h3 className='text-black font-normal'>
              Create Account And See Our Gallery
            </h3>
          </div>
          <div className='inline'>
            <img src={LogoOrca} />
          </div>
        </div>
        <div className='flex flex-col items-center justify-center bg-white w-6/12 gap-4 px-16'>
          <div className='text-left'>
            <h1 className='font-bold'>Get Started</h1>
            <h3 className='font-normal text-center'>
              Already have an account?{' '}
              <Link
                to='/signin'
                className='text-primary'>
                Sign in
              </Link>
            </h3>
          </div>
          <div className='flex flex-row gap-8'>
            <button
              onClick={handleGoogleSignIn}
              className='socmed-button'>
              <img
                className='object-cover'
                src={GoogleLogo}
              />
              <span>Sign up with Google</span>
            </button>
            <button
              onClick={handleFacebookSignIn}
              className='socmed-button'>
              <img
                className='object-cover'
                src={FacebookLogo}
              />
              <span>Sign up with Facebook</span>
            </button>
          </div>
          <div className='flex flex-row gap-6'>
            <img
              src={HorizontalLine}
              alt=''
            />
            <h4>or</h4>
            <img
              src={HorizontalLine}
              alt=''
            />
          </div>
          <div>
            <form
              className='flex flex-col gap-8 text-left w-96'
              onSubmit={handleSubmit(onSubmit)}>
              <div className='flex flex-col'>
                <label
                  className='font-normal'
                  htmlFor='name'>
                  Name
                </label>
                <input
                  className='input-field'
                  type='text'
                  placeholder='Name'
                  {...register('name', { required: true })}
                />
              </div>
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
              {pending ? (
                <div className='btn-submit flex items-center justify-center'>
                  <BeatLoader color='#ffffff' />
                </div>
              ) : (
                <input
                  className='btn-submit'
                  type='submit'
                  value='Create'
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
