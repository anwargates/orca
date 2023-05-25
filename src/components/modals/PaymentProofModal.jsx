import { Image, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React from 'react'

export const PaymentProofModal = ({ url }) => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <div
        onClick={open}
        className='bg-[#68B984] w-32 h-8 text-xs text-white rounded-md flex justify-center items-center hover:cursor-pointer m-auto'>
        Lihat Bukti Pembayaran
      </div>
      <Modal.Root
        centered
        opened={opened}
        onClose={close}>
        <Modal.Overlay />
        <Modal.Content className='rounded-3xl'>
          <Modal.Header>
            <Modal.CloseButton
              iconSize='28px'
              size='28px'
            />
          </Modal.Header>
          <Modal.Body>
            <h1 className='font-semibold text-xl text-center mb-4'>
              Bukti Pembayaran
            </h1>
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
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}
