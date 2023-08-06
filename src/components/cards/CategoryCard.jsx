import React from 'react'

export const CategoryCard = ({ title, image }) => {
  return (
    <>
      <div className='relative flex content-center items-center justify-center w-72 h-72'>
        <img
          src={image}
          alt='backgroundImage'
          className='absolute top-0 h-full w-full brightness-[.7]'
        />
        <div className='container relative w-full h-full'>
          <div className='flex h-full w-full items-center p-1'>
            <div className='flex items-center border-2 border-white w-full h-full p-1'>
              <div className='flex items-center justify-center border-2 border-white w-full h-full'>
                <h1 className='text-white font-bold text-sm tracking-widest hover:scale-125 transition duration-150 ease-in-out cursor-pointer'>
                  {title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
