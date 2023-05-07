import React, { Children, useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import galleryData from '../data/gallery'
import { motion, AnimatePresence } from 'framer-motion'

export const Gallery = () => {
  const [categorySelect, setCategorySelect] = useState('ALL')
  const [images, setImages] = useState(galleryData)

  const handleCategory = (e) => {
    console.log(e.target.innerHTML)
    setCategorySelect(e.target.innerHTML)
    // setImages([])
    setImages(() =>
      e.target.innerHTML === 'ALL'
        ? galleryData
        : galleryData.filter((data) => data.category === e.target.innerHTML)
    )
  }

  const AnimateDiv = ({ children }) => (
    <motion.div
      layout
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 10, opacity: 0 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}>
      {children}
    </motion.div>
  )

  const AnimateDiv2 = ({ children }) => (
    <motion.div
      layout
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 20, opacity: 0 }}
      exit={{ y: -20, opacity: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}>
      {children}
    </motion.div>
  )

  const AnimateDiv3 = ({ children }) => (
    <motion.div
      layout
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 10, opacity: 0 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}>
      {children}
    </motion.div>
  )

  return (
    <>
      <section className='flex mt-[10vh]'>
        <div className='container max-w-7xl mx-auto px-8 py-12'>
          <h2 className='text-3xl font-bold sm:text-5xl mb-12'>
            GALLERY PORTOFOLIO
          </h2>
          <div className='mb-12'>
            <ul className='flex items-center flex-wrap justify-center text-greyCategory text-base font-semibold gap-6 [&>li]:cursor-pointer [&>li]:border-b-2'>
              <li
                onClick={handleCategory}
                className={
                  categorySelect === 'ALL' ? 'category-active' : 'border-white'
                }>
                ALL
              </li>
              <RxDotFilled className='text-greyDot' />
              <li
                onClick={handleCategory}
                className={
                  categorySelect === 'PRODUCT'
                    ? 'category-active'
                    : 'border-white'
                }>
                PRODUCT
              </li>
              <RxDotFilled className='text-greyDot' />
              <li
                onClick={handleCategory}
                className={
                  categorySelect === 'SPORT'
                    ? 'category-active'
                    : 'border-white'
                }>
                SPORT
              </li>
              <RxDotFilled className='text-greyDot' />
              <li
                onClick={handleCategory}
                className={
                  categorySelect === 'EVENT'
                    ? 'category-active'
                    : 'border-white'
                }>
                EVENT
              </li>
              <RxDotFilled className='text-greyDot' />
              <li
                onClick={handleCategory}
                className={
                  categorySelect === 'FAMILY'
                    ? 'category-active'
                    : 'border-white'
                }>
                FAMILY
              </li>
              <RxDotFilled className='text-greyDot' />
              <li
                onClick={handleCategory}
                className={
                  categorySelect === 'PORTRAIT'
                    ? 'category-active'
                    : 'border-white'
                }>
                PORTRAIT
              </li>
            </ul>
          </div>
          <div className='flex flex-wrap justify-center gap-5 min-h-screen'>
            <AnimatePresence>
              <div className='flex flex-col gap-5 w-80'>
                <AnimateDiv>
                  <img
                    src={images[0]?.image}
                    alt=''
                    className='w-full'
                  />
                </AnimateDiv>
                <AnimateDiv2>
                  <img
                    src={images[1]?.image}
                    alt=''
                    className='w-full'
                  />
                </AnimateDiv2>
              </div>
              <div className='flex flex-col gap-5 w-80'>
                <AnimateDiv>
                  <img
                    src={images[2]?.image}
                    alt=''
                    className='w-full'
                  />
                </AnimateDiv>
                <AnimateDiv2>
                  <img
                    src={images[3]?.image}
                    alt=''
                    className='w-full'
                  />
                </AnimateDiv2>
                <AnimateDiv3>
                  <img
                    src={images[4]?.image}
                    alt=''
                    className='w-full'
                  />
                </AnimateDiv3>
              </div>
              <div className='flex flex-col gap-5 w-64'>
                <AnimateDiv>
                  <img
                    src={images[5]?.image}
                    alt=''
                    className='w-full'
                  />
                </AnimateDiv>
              </div>
            </AnimatePresence>
          </div>
          <Link to=''>
            <button className='my-10 bg-greyCategory text-2xl text-white rounded-[56px] p-5 w-56 font-bold'>
              Find More
            </button>
          </Link>
        </div>
      </section>
    </>
  )
}
