import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import galleryData from '../data/gallery'
import { Image } from '@mantine/core'
export const PhotoCategory = () => {
  return (
    <>
      <div className='mt-[15vh] bg-blueBackground'>
        <div className='relative h-28'>
          <div className='absolute rounded-full bg-primary text-white font-bold text-3xl lg:text-5xl py-11 md:w-[717px] -mt-14 inset-x-0 mx-auto'>
            Kategori Foto
          </div>
        </div>
        <div className='container max-w-7xl mx-auto px-2 py-8 md:px-16'>
          <div className='grid md:grid-cols-2 gap-10 mt-10'>
            {data.map(({ title, pict, link }, index) => (
              <Card
                key={index}
                title={title}
                // pict={pict}
                link={link}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const settings = {
  dots: false,
  // dotsClass: 'slick-dots testimony-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  lazyLoad: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {},
    },
  ],
}

const Card = ({ title, link }) => (
  <div className='grid md:block bg-white shadow-lg rounded-2xl px-8 lg:px-16 py-8 gap-6'>
    <h2 className='w-full text-3xl my-4 text-primary font-bold text-left truncate'>
      {title}
    </h2>
    <div className="my-4">
      <Slider {...settings}>
        {galleryData
          .filter(
            (item) =>
              item.category.toLowerCase() === title.split(' ')[0].toLowerCase()
          )
          .map((item, index) => (
            <div
              key={index}
              className='w-full h-80 lg:h-[400px]'>
              <img
                className='w-full h-full rounded-lg object-cover'
                src={item?.image}
                // src={IMAGE}
                alt=''
              />
            </div>
          ))}
      </Slider>
    </div>
    <Link
      className='block bg-primary w-full my-4 rounded-2xl text-white text-xl font-bold py-3 hover:text-gray-100'
      to={`/photo-category/${link}`}>
      See More
    </Link>
  </div>
)

const data = [
  {
    title: 'Sport Photography',
    // pict: Sport,
    link: 'sport',
  },
  {
    title: 'Product Photography',
    // pict: Product,
    link: 'product',
  },
  {
    title: 'Event Photography',
    // pict: Event,
    link: 'event',
  },
  {
    title: 'Wedding Photography',
    // pict: Wedding,
    link: 'wedding',
  },
  {
    title: 'Portrait Photography',
    // pict: Portrait,
    link: 'portrait',
  },
  {
    title: 'Family Photography',
    // pict: Family,
    link: 'family',
  },
]
