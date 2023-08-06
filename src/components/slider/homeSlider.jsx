import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Hero from '../../assets/home/1.png'
import galleryData from '../../data/gallery'

export default class HomeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots home-dots',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            dots: false,
          },
        },
      ],
    }

    const content = [Hero, Hero, Hero, Hero]

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
      }
      return array
    }

    const randomizeAndLimit = (arrayOfObjects, limit) => {
      const shuffledArray = [...arrayOfObjects]
      shuffleArray(shuffledArray)
      return shuffledArray.slice(0, limit)
    }

    const limit = 5
    const randomizedAndLimitedArray = randomizeAndLimit(galleryData, limit)

    return (
      <>
        <Slider {...settings}>
          {content.map((item, index) => (
            <div
              key={index}
              className='max-h-[90vh]'>
              <img
                className='w-full brightness-[.3] object-cover'
                src={item}
                alt=''
              />
            </div>
          ))}
        </Slider>
        <div className='absolute inset-x-0 bottom-10 md:bottom-20'>
          <h1 className='text-white font-bold text-sm md:text-md lg:text-2xl tracking-widest mb-8'>
            Khusus Jakarta Timur dan Sekitar
          </h1>
          <Link to='/photo-category'>
            <button className='border-4 text-sm md:text-md lg:text-2xl border-white text-white rounded-[56px] p-1 md:p-2 lg:p-4 lg:px-6 w-32 font-bold md:w-auto'>
              Pesan Sekarang
            </button>
          </Link>
        </div>
      </>
    )
  }
}
