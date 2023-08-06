import React from 'react'
import LogoOrca from '../assets/logo-orca.svg'

const About = () => {
  return (
    <>
      <section className='flex'>
        <div className='container max-w-7xl mx-auto px-8 py-12 flex flex-col gap-6'>
          <img
            src={LogoOrca}
            alt=''
            className='m-auto'
          />
          <h1 className='text-2xl md:text-5xl font-bold text-center'>ORCA PRODUCTION</h1>
          <p>
            Orca Production merupakan sebuah penyedia jasa fotografi yang berada
            di Jakarta. Orca Production sendiri telah berdiri sejak Oktober
            2020. Pada awal berdiri, Orca Production hanya berfokus pada
            Automotive Photography, namun seiring berjalan nya waktu Orca
            Production akhirnya menawarkan berbagai macam kategori foto seperti
            Product Photography, Event Photography, Wedding Photography, Potrait
            Photography, dan Family Photography.
          </p>
          <p>
            Orca Production bisa menjadi solusi semua orang dalam mengabadikan
            moment. Kami akan terus memberikan pelayanan yang terbaik kepada
            kalian semua. Dapatkan hasil foto yang berkualitas dengan harga yang
            sangat terjangkau!
          </p>
        </div>
      </section>
    </>
  )
}

export default About
