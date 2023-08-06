import React, { Component } from 'react'
import Slider from 'react-slick'
import galleryData from '../../data/gallery'

export default class DetailSlider extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots testimony-dots',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {},
        },
      ],
    }

    const { content } = this.props

    return (
      <Slider {...settings}>
        {galleryData
          .filter(
            (item) =>
              item.category.toLowerCase() ===
              content.title.split(' ')[0].toLowerCase()
          )
          .map((item, index) => (
            <div
              key={index}
              className='lg:w-[560px] h-80 lg:h-[769px]'>
              <img
                className='w-full h-full rounded-lg object-cover'
                src={item.image}
                alt=''
              />
            </div>
          ))}
      </Slider>
    )
  }
}
