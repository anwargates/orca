import React from 'react'
import { BenefitCard } from '../components/cards/BenefitCard'
import { CategoryCard } from '../components/cards/CategoryCard'
import HomeSlider from '../components/slider/HomeSlider'
import categoryData from '../data/category'
import benefitData from '../data/benefit'
import { HorizontalLine } from '../components/home/HorizontalLine'
import { TestimonyCard } from '../components/cards/TestimonyCard'
import pp1 from '../assets/home/pp1.png'
import testimonyData from '../data/testimony'
import { rem } from '@mantine/core'
import TestimonySlider from '../components/slider/TestimonySlider'
import { DividerTitle } from '../components/home/DividerTitle'
import { FaqAccordion } from '../components/home/FaqAccordion'
import FaqImage from '../assets/home/faq.png'
import WhatsappLogo from '../assets/whatsapp.svg'

export const HomePage = () => {
  return (
    <>
      {/* HERO SLIDER SECTION */}
      <section className='relative max-h-[100vh]'>
        <HomeSlider />
      </section>

      {/* BENEFIT SECTION */}
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
      <section className='relative flex content-center items-center justify-center min-h-[50vh] mb-36'>
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
      <DividerTitle title='Kategori Foto Yang Tersedia' />
      <section>
        <div className='container max-w-7xl mx-auto p-16'>
          <div className='flex gap-6 flex-wrap items-stretch justify-center'>
            {categoryData.map(({ title, image }) => (
              <CategoryCard
                key={title}
                title={title}
                image={image}
              />
            ))}
          </div>
        </div>
        <button className='items-center bg-primary text-white font-bold text-3xl py-4 px-12 rounded-3xl'>
          Pesan Sekarang
        </button>
      </section>
      <section className='flex'>
        <div className='container max-w-7xl mx-auto p-16'>
          <h2 className='font-bold text-2xl mb-10'>
            Trusted by Thousand Of Happy Customer{' '}
          </h2>
          <HorizontalLine />
          {/* <TestimonySliderMantine /> */}
          <TestimonySlider />
        </div>
      </section>
      <DividerTitle title='FAQ' />
      <section>
        <div className='grid grid-cols-2 container max-w-7xl mx-auto p-16'>
          <div className='p-4'>
            <img
              src={FaqImage}
              alt='faqimage'
            />
          </div>
          <FaqAccordion />
        </div>
      </section>
      <div className='w-full flex justify-center bg-primary py-10 mb-44'>
        <div className='container flex items-center justify-around'>
          <h3 className='text-white font-medium'>
            Punya pertanyaan lebih lanjut ?
          </h3>
          <button className='flex items-center justify-center py-4 px-8 gap-4 bg-blue rounded-md text-white'>
            <img
              src={WhatsappLogo}
              alt='whatsapplogo'
            />
            <span className='font-semibold'>Hubungi Kami</span>
          </button>
        </div>
      </div>
    </>
  )
}
