import React, { useState } from 'react'
import LogoOrca from '../assets/logo-orca.svg'
import GoogleLogo from '../assets/google-logo.svg'
import FacebookLogo from '../assets/facebook-logo.svg'
import HorizontalLine from '../assets/line.svg'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../config/firebase'
import BeatLoader from 'react-spinners/BeatLoader'

export const SignIn = () => {
  const navigate = useNavigate()
  const [pending, setPending] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setPending(true)
    console.log(data)
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        setPending(false)
        navigate('/')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        setPending(false)
        alert(error)
      })
  }

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider).then((user) => {
      console.log(user)
      setPending(false)
      navigate('/')
    })
  }

  console.log(errors)

  return (
    <>
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
              Don't have an account?{' '}
              <Link
                to='/signup'
                className='text-primary'>
                Sign Up
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
              <span>Sign in with Google</span>
            </button>
            <a href=''>
              <button className='socmed-button'>
                <img
                  className='object-cover'
                  src={FacebookLogo}
                />
                <span>Sign in with Facebook</span>
              </button>
            </a>
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
                  htmlFor='email'>
                  Email
                </label>
                <input
                  className='input-field'
                  name='email'
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
                  name='passwords'
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
                  value='Login'
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
