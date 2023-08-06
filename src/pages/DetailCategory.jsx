import React from 'react'
import { Link, useParams } from 'react-router-dom'
// @ts-ignore
import BackButton from '../assets/back-button.svg'
// @ts-ignore
import CircleStar from '../assets/circle-star.svg'
// @ts-ignore
import GoogleDrive from '../assets/google-drive-folder.svg'
// @ts-ignore
import ImageSquare from '../assets/image-square.svg'
// @ts-ignore
import Location from '../assets/location.svg'
// @ts-ignore
import Person from '../assets/person.svg'
import DetailSlider from '../components/slider/DetailSlider'
import categoryList from '../data/categoryList'

export const DetailCategory = () => {
  const { id } = useParams()
  // const [currentCategory, setCurrentCategory] = useState(null)
  // const images = [Event1, Event1, Event1]

  // useEffect(() => {
  //   const filtered = categoryList.filter((item) =>
  //     item.title.includes(id.toUpperCase())
  //   )
  //   console.log(filtered[0])
  //   setCurrentCategory(filtered[0])
  //   console.log(currentCategory)
  // }, [])

  const currentCategory = categoryList.find((item) =>
    // @ts-ignore
    item.title.includes(id)
  )

  return currentCategory ? (
    <>
      {console.log(currentCategory)}

      <div className='mt-20'>
        <div className='rounded-full bg-primary text-white font-bold text-3xl lg:text-5xl py-11 md:w-[717px] inset-x-0 mx-auto capitalize'>
          {currentCategory.title}
        </div>
      </div>
      {/* <div className='mt-2 default-container'>
        <Link to='/photo-category'>
            <img
              src={BackButton}
              alt='back-button'
              className='2xl:-ml-32'
            />
        </Link>
      </div> */}
      <div className='default-container mt-12'>
        {/* <div className='grid lg:grid-cols-3 grid-cols-1'> */}
        <div className='flex flex-col lg:flex-row flex-wrap w-full'>
          <div className='flex-none lg:w-fit w-full'>
            <Link to='/photo-category'>
              <img
                src={BackButton}
                alt='back-button'
                className=''
              />
            </Link>
          </div>
          <div className='lg:w-80 w-full flex-1 px-4 mb-20'>
            <DetailSlider content={currentCategory} />
          </div>
          <div className='flex flex-col flex-1 justify-between pb-2 pt-3 px-4 md:px-16 mb-20'>
            <div className='flex flex-col'>
              <div className='flex flex-col gap-5'>
                <div className='flex w-full text-left font-bold gap-2 items-end'>
                  <span className='text-6xl'>{currentCategory.price}k</span>
                  <span className='text-lg'>/ JAM</span>
                </div>
                <div className='max-w-[360px] h-[6px] bg-primary' />
              </div>
              <div className='flex text-2xl font-semibold mt-4 gap-5 items-center'>
                <img
                  src={Location}
                  alt='location'
                />
                <span className='text-blueDark'>
                  {currentCategory.location}
                </span>
                <img
                  src={Person}
                  alt='person'
                />
                <span className='text-blueDark'>
                  Max. {currentCategory.max}
                </span>
              </div>
              <div className='text-blueDark text-sm text-left mt-8'>
                *Harga diatas sesuai dengan ketentuan yang berlaku, apabila ada
                penambahan jumlah orang dan perubahan lokasi maka harga akan
                disesuaikan kembali.
              </div>
            </div>
            <div className='flex flex-col gap-8 items-start'>
              <h2 className='text-blueDark font-extrabold text-2xl'>
                Yang akan kamu dapatkan :
              </h2>
              <div className='flex flex-col gap-6 text-xl font-semibold text-left'>
                <div className='flex items-center gap-9'>
                  <img
                    src={CircleStar}
                    alt='circle-star'
                    className='flex-none w-16 h-16'
                  />
                  <span className='text-blueDark'>
                    {currentCategory.benefit[0]}
                  </span>
                </div>
                <div className='flex items-center gap-9'>
                  <img
                    src={ImageSquare}
                    alt='image-square'
                    className='flex-none w-16 h-16'
                  />
                  <span className='text-blueDark'>
                    {currentCategory.benefit[1]}
                  </span>
                </div>
                <div className='flex items-center gap-9'>
                  <img
                    src={GoogleDrive}
                    alt='google-drive'
                    className='flex-none w-16 h-16'
                  />
                  <span className='text-blueDark'>
                    {currentCategory.benefit[2]}
                  </span>
                </div>
              </div>
              <Link
                to={`/photo-category/${id}/payment`}
                className='flex bg-primary items-center justify-center text-white text-3xl font-semibold w-full h-20 rounded-xl'>
                Pesan Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
}
