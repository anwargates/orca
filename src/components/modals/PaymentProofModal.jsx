import { Image, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import React from 'react'

export const PaymentProofModal = ({ url, urlPelunasan }) => {
  const showModal = () => {
    modals.open({
      title: 'Bukti Pembayaran',
      styles: {
        title: {
          fontSize: '20px',
          fontWeight: 'bold',
        },
      },
      children: (
        <>
          <h1 className='text-center text-xl'>Bukti DP</h1>
          <Image
            className='min-w-[200px] min-h-[200px]'
            withPlaceholder
            styles={{
              placeholder: {
                minHeight: '200px',
              },
            }}
            src={url}
            alt='payment-proof'
          />
          <h1 className='text-center text-xl'>Bukti Pelunasan</h1>
          <Image
            className='min-w-[200px] min-h-[200px]'
            withPlaceholder
            styles={{
              placeholder: {
                minHeight: '200px',
              },
            }}
            src={urlPelunasan}
            alt='payment-proof'
          />
        </>
      ),
    })
  }

  return (
    <>
      <div
        onClick={showModal}
        className='bg-primary px-6 text-center w-32 h-8 text-xs text-white rounded-md flex justify-center items-center hover:cursor-pointer m-auto'>
        Lihat Bukti Pembayaran
      </div>
    </>
  )
}
