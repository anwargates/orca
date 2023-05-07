import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import Hero from '../../assets/home/1.png'
import { TestimonyCard } from '../cards/TestimonyCard'
import testimonyData from '../../data/testimony'

export default class TestimonySlider extends Component {
  render() {
    const settings = {
      dots: true,
      dotsClass: 'slick-dots testimony-dots',
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            dots: false,
          },
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings}>
        {testimonyData.map(({ name, profilePic, description, rating }, id) => {
          return (
            <TestimonyCard
              key={id}
              name={name}
              profilePic={profilePic}
              description={description}
              rating={rating}
            />
          )
        })}
      </Slider>
    )
  }
}
