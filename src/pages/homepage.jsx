import React from 'react'
import { BenefitCard } from '../components/cards/benefitCard'
import { CategoryCard } from '../components/cards/categoryCard'
import HomeSlider from '../components/slider/homeSlider'
import trustedData from '../data/trusted'
import benefitData from '../data/benefit'

export const HomePage = () => {
  return (
    <>
      <section className='max-h-[100vh]'>
        <HomeSlider />
      </section>
      <section className='min-h-[50vh]'>
        <div className='container max-w-7xl mx-auto p-16'>
          <h2 className='font-bold text-2xl mb-20'>Kenapa harus Orca?</h2>
          <div className='flex gap-2 flex-wrap items-stretch justify-center'>
            {benefitData.map(({ title, icon, description }) => (
              <BenefitCard
                key={title}
                title={title}
                icon={icon}
                description={description}
              />
            ))}
          </div>
        </div>
      </section>
      <section className='relative flex content-center items-center justify-center min-h-[50vh]'>
        <div className='absolute top-0 h-full w-full bg-banner bg-cover bg-center brightness-[.45]' />
        <div className='container relative max-w-7xl mx-auto'>
          <div className='flex flex-wrap items-center'>
            <div className='ml-auto mr-auto w-full px-4 text-center lg:w-8/12'>
              <h1 className='text-white font-bold text-2xl tracking-widest'>
                CREATE A VISUALLY PROFESSIONAL IMAGE
              </h1>
            </div>
          </div>
        </div>
      </section>
      <section className='flex'>
        <div className='container max-w-7xl mx-auto p-16'>
          <h2 className='font-bold text-2xl mb-20'>
            Trusted by Thousands of <br /> Happy Customer
          </h2>
          <div className='flex gap-6 flex-wrap items-stretch justify-center'>
            {trustedData.map(({ title, image }) => (
              <CategoryCard
                key={title}
                title={title}
                image={image}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
