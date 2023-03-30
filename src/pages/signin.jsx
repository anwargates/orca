import React from 'react'
import LogoOrca from '../assets/logo-orca.svg'
import GoogleLogo from '../assets/google-logo.svg'
import FacebookLogo from '../assets/facebook-logo.svg'
import HorizontalLine from '../assets/line.svg'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => console.log(data)
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
            <a href=''>
              <button className='socmed-button'>
                <img
                  className='object-cover'
                  src={GoogleLogo}
                />
                <span>Sign in with Google</span>
              </button>
            </a>
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
                  {...register('Email', {
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
                  {...register('Password', { required: true })}
                />
              </div>

              <input
                className='btn-submit'
                type='submit'
                value='Login'
              />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
