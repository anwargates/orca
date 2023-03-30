import React from 'react'

export const BenefitCard = ({ title, icon, description }) => {
  return (
    <>
      <div className='flex flex-col overflow-hidden items-center justify-center gap-5 px-6 py-4 w-60 border-4 border-greySecondary rounded-2xl transition-all hover:scale-105'>
        <img
          src={icon}
          alt=''
        />
        <h3 className='font-extrabold'>{title}</h3>
        <p>{description}</p>
      </div>
    </>
  )
}
