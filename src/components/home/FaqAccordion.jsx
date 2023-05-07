import React from 'react'
import { Accordion, rem } from '@mantine/core'

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
        <Accordion.Panel className='border-l-4 border-[#F39C12]'>
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
        <Accordion.Panel className='border-l-4 border-[#F39C12]'>
          Foto akan diserahkan 1-2 hari setelah dilakukannya pemotretaan.
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='cara'>
        <Accordion.Control>
          Bagaimana cara melakukan pemesanan?
        </Accordion.Control>
        <Accordion.Panel className='border-l-4 border-[#F39C12]'>
          .
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value='sertifikat'>
        <Accordion.Control>
          Kapan e - sertifikat akan diberikan ?
        </Accordion.Control>
        <Accordion.Panel className='border-l-4 border-[#F39C12]'>
          Sertifikat akan diberikan paling lambat dua minggu dari hari terakhir
          kelas diadakan.
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
