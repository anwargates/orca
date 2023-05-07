import { Carousel } from '@mantine/carousel'
import { rem } from '@mantine/core'
import React, { useRef } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import testimonyData from '../../data/testimony'
import { TestimonyCard } from '../cards/TestimonyCard'

export const TestimonySliderMantine = () => {
  // const autoplay = useRef(Autoplay({ delay: 2000 }))
  return (
    <>
      <Carousel
        slideSize='33.333333%%'
        height={500}
        align='center'
        mx='auto'
        slideGap='xl'
        controlsOffset='xs'
        controlSize={28}
        loop
        withControls={true}
        withIndicators
        slidesToScroll={1}
        // plugins={[autoplay.current]}
        // onMouseEnter={autoplay.current.stop}
        // onMouseLeave={autoplay.current.reset}
        styles={{
          
          indicator: {
            width: rem(12),
            height: rem(4),
            color: '#149BFC',
            backgroundColor: '#149BFC',
            transition: 'width 250ms ease',

            '&[data-active]': {
              width: rem(40),
              color: '#149BFC',
            },
          },
        }}>
        {testimonyData.map(({ name, profilePic, description, rating }, id) => {
          return (
            <Carousel.Slide key={id}>
              <TestimonyCard
                name={name}
                profilePic={profilePic}
                description={description}
                rating={rating}
              />
            </Carousel.Slide>
          )
        })}
      </Carousel>
    </>
  )
}
