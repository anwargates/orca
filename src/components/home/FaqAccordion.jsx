import React from 'react'
import { Accordion, rem } from '@mantine/core'
import OrderSteps from '../../assets/home/steps.png'

export const FaqAccordion = () => {
  return (
    <Accordion
      variant='separated'
      radius='md'
      defaultValue='jumlah'
      styles={{
        item: {
          textAlign: 'left',
          backgroundColor: '#fff',
          border: `${rem(1)} solid #667080`,
          '&[data-active]': {
            backgroundColor: '#fff',
            border: `${rem(1)} solid #667080`,
          },
        },
      }}>
      <Accordion.Item value='jumlah'>
        <Accordion.Control>
          Berapa jumlah foto yang akan di dapatkan per bundling foto?
        </Accordion.Control>
        <Accordion.Panel className='border-l-4 border-primary'>
          Foto yang akan di dapat per bundling itu tergantung bundling yang akan
          di ambil, karena tiap bundling mendapatkan hasil foto yang
          berbeda-beda, contohnya pada bundling Automotive pelanggan akan
          mendapatkan 10 foto terbaik yang telah di sortir akan tetapi pelanggan
          juga dapat melakukan request hasil yang diinginkan.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='durasi'>
        <Accordion.Control>
          Berapa lama hasil foto diserahkan kepada pelanggan?
        </Accordion.Control>
        <Accordion.Panel className='border-l-4 border-primary'>
          Foto akan diserahkan 1-2 hari setelah dilakukannya pemotretaan.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='cara'>
        <Accordion.Control>
          Bagaimana cara melakukan pemesanan?
        </Accordion.Control>
        <Accordion.Panel className='border-l-4 border-primary'>
          <img
            src={OrderSteps}
            alt=''
          />
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='hasil'>
        <Accordion.Control>
          Hasil foto di kirim menggunakan via apa?
        </Accordion.Control>
        <Accordion.Panel className='border-l-4 border-primary'>
          Hasil foto akan dikirimkan melalui link Google Drive
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
