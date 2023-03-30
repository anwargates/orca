import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Hero from '../../assets/home/1.png'

export default class HomeSlider extends Component {
  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
    }

    const content = [Hero, Hero, Hero, Hero]

    return (
      <Slider {...settings}>
        {content.map((item, index) => (
          <div
            key={index}
            className='relative max-h-[90vh] mt-[10vh]'>
            <img
              className='w-full brightness-[.3] object-cover'
              src={item}
              alt=''
            />
            <div className='absolute inset-x-0 bottom-20'>
              <h1 className='text-white font-bold text-2xl tracking-widest mb-8'>
                MAKE EVERY PRECIOUS MOMENT COUNT
              </h1>
              <Link to='/gallery'>
                <button className='border-4 text-2xl border-white text-white rounded-[56px] p-5 w-56 font-bold'>
                  Find More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    )
  }
}
