import React from 'react'
import Quote from '../../assets/quote.svg'
import { Rating } from '@mantine/core'

export const TestimonyCard = ({ name, profilePic, description, rating }) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center gap-1 p-6 w-[343px] h-[436px] border-4 border-primary rounded-3xl m-auto'>
        <div className='flex justify-start w-full px-5'>
          <img
            src={Quote}
            alt=''
          />
        </div>
        <div className='flex h-5/6 justify-between items-center'>
          <p>{description}</p>
        </div>
        <div className='flex gap-3 h-1/6'>
          <img
            src={profilePic}
            alt=''
          />
          <div className='flex flex-col justify-center items-start'>
            <h3 className='font-extrabold'>{name}</h3>
            <Rating value={rating} readOnly/>
          </div>
        </div>
      </div>
    </>
  )
}
