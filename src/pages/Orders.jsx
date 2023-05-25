import { Accordion, Stepper } from '@mantine/core'
import React from 'react'

export const Orders = () => {
  return (
    <>
      <div className='container flex flex-col w-full lg:max-w-5xl'>
        <Accordion chevron={null} defaultValue='id1'>
          <Accordion.Item value='id1'>
            <Accordion.Control>
              <div className='flex bg-primary rounded-2xl py-6 px-8'>
                <div className='flex-[2] text-left'>
                  <h1 className='text-2xl font-bold mb-6'>
                    Automotive Photography
                  </h1>
                  <h2 className='text-2xl font-bold mb-2'>250k/Jam</h2>
                  <p className='text-xs font-medium'>
                    *Harga diatas sesuai dengan ketentuan yang berlaku, apabila
                    ada penambahan jumlah orang dan perubahan lokasi maka harga
                    akan disesuaikan kembali.
                  </p>
                </div>
                <div className='flex-1'>
                  <img
                    src=''
                    alt=''
                  />
                </div>
              </div>
            </Accordion.Control>
            <Accordion.Panel>
              <Stepper
                color='#88CEEF'
                active={3}
                orientation='vertical'
                styles={{
                  stepBody: {
                    marginBottom: '-20px',
                    fontSize: '20px',
                  },
                }}>
                <Stepper.Step label='Pesanan diterima' />
                <Stepper.Step label='Menunggu konfirmasi pembayaran DP' />
                <Stepper.Step label='Pembayaran DP diterima' />
                <Stepper.Step label='Pemotretan' />
                <Stepper.Step label='Menunggu konfirmasi pembayaran pelunasan' />
                <Stepper.Step label='Pembayaran pelunasan diterima' />
              </Stepper>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </>
  )
}
