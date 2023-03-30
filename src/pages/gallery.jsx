import React, { Children, useState } from 'react'
import { RxDotFilled } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import galleryData from '../data/gallery'

export const Gallery = () => {
  const [categorySelect, setCategorySelect] = useState('ALL')
  const [images, setImages] = useState(galleryData)

  const handleCategory = (e) => {
    console.log(e.target.innerHTML)
    setCategorySelect(e.target.innerHTML)
    setImages(() =>
      e.target.innerHTML === 'ALL'
        ? galleryData
        : galleryData.filter((data) => data.category === e.target.innerHTML)
    )
  }

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
          <div className='flex flex-wrap justify-center gap-5'>
            <div className='flex flex-col gap-5'>
              <img
                src={images[0]?.image}
                alt=''
              />
              <img
                src={images[1]?.image}
                alt=''
              />
            </div>
            <div className='flex flex-col gap-5'>
              <img
                src={images[2]?.image}
                alt=''
              />
              <img
                src={images[3]?.image}
                alt=''
              />
              <img
                src={images[4]?.image}
                alt=''
              />
            </div>
            <div className='flex flex-col gap-5'>
              <img
                src={images[5]?.image}
                alt=''
              />
            </div>
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
