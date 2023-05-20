import React from 'react'
import Sport from '../assets/category/sport.png'
import Wedding from '../assets/category/wedding.png'
import Event from '../assets/category/event.png'
import Family from '../assets/category/family.png'
import Product from '../assets/category/product.png'
import Portrait from '../assets/category/portrait.png'
import { Link } from 'react-router-dom'

export const PhotoCategory = () => {
  return (
    <>
      <div className='mt-60 bg-blueBackground'>
        <div className='relative h-28'>
          <div className='absolute rounded-full bg-primary text-white font-bold text-5xl py-11 md:w-[717px] -mt-14 inset-x-0 mx-auto'>
            Kategori Foto
          </div>
        </div>
        <div className='container max-w-7xl mx-auto p-16'>
          <div className='grid grid-cols-2 grid-rows-3 gap-10 mt-10'>
            {data.map(({ title, pict, link }, id) => (
              <Card
                id={id}
                title={title}
                pict={pict}
                link={link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const Card = ({ title, pict, link }) => (
  <div className='w-[630] h-[814] flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl px-16 py-8 gap-6'>
    <h2 className='w-full text-3xl mt-4 text-primary font-bold text-left'>
      {title}
    </h2>
    <img
      className='w-full'
      src={pict}
      alt=''
    />
    <Link
      className='bg-primary w-full rounded-2xl text-white text-xl font-bold py-3 hover:text-gray-100'
      to={`/photo-category/${link}`}>
      See More
    </Link>
  </div>
)

const data = [
  {
    title: 'Sport Photography',
    pict: Sport,
    link: 'sport',
  },
  {
    title: 'Product Photography',
    pict: Product,
    link: 'product',
  },
  {
    title: 'Event Photography',
    pict: Event,
    link: 'event',
  },
  {
    title: 'Wedding Photography',
    pict: Wedding,
    link: 'wedding',
  },
  {
    title: 'Portrait Photography',
    pict: Portrait,
    link: 'portrait',
  },
  {
    title: 'Family Photography',
    pict: Family,
    link: 'family',
  },
]
